import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

function getFormattedTimestamp() {
  const now = new Date();
  const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()].join("/");
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()]
    .map((num) => String(num).padStart(2, "0")) // Ensure two digits for time parts
    .join(":");
  return `${date}, ${time}`;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests allowed" },
      { status: 405 }
    );
  }

  try {
    const body = await req.json();
    const email = body.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Email is required and must be a string" },
        { status: 400 }
      );
    }

    // Ensure environment variables are loaded correctly
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKey || !clientEmail || !sheetId) {
      console.error(
        "Missing Google Sheets API credentials in environment variables"
      );
      return NextResponse.json(
        {
          message:
            "Server configuration error. Please contact Vincent at mcleesevj@gmail.com",
        },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const formattedTimestamp = getFormattedTimestamp();

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:C", // Updated for Name, Email, Added columns
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[null, email, formattedTimestamp]], // Name is null again
      },
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding email to Google Sheet:", error);
    let errorMessage = "An error occurred. Please try again.";
    if (error instanceof Error) {
      // Basic error type checking
      if (error.message.includes("PERMISSION_DENIED")) {
        errorMessage =
          "Permission error with Google Sheets. Please contact Vincent at mcleesevj@gmail.com";
      } else if (error.message.includes("invalid_grant")) {
        errorMessage =
          "Authentication error with Google Sheets. Please check credentials or contact Vincent at mcleesevj@gmail.com";
      }
    }
    return NextResponse.json(
      {
        message:
          errorMessage +
          " If the issue persists, contact Vincent at mcleesevj@gmail.com",
      },
      { status: 500 }
    );
  }
}
