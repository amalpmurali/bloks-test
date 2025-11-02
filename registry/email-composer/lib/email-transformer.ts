/**
 * Client-side email HTML transformer that calls the server API
 */

/**
 * Calls the API to transform TipTap HTML content to email-safe HTML
 */
export async function transformToEmailHtml(
  tiptapHtml: string
): Promise<string> {
  try {
    // Safety check for empty content
    if (!tiptapHtml || tiptapHtml.trim() === "") {
      return "";
    }

    // Call the API to transform the HTML
    const response = await fetch("/api/transform-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html: tiptapHtml }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.html;
  } catch (error) {
    console.error("Error transforming email content:", error);
    // Fallback to simple HTML wrapper if transformation fails
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Email</title>
      </head>
      <body style="font-family: Arial, sans-serif;">
        ${tiptapHtml}
      </body>
      </html>
    `;
  }
}

/**
 * Creates a preview version of the email
 */
export function createEmailPreview(html: string): string {
  return html;
}
