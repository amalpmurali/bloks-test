import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Hr,
} from "@react-email/components";
import { createElement } from "react";

// Force Node.js runtime instead of Edge runtime
export const runtime = "nodejs";

/**
 * Pre-processes HTML content from TipTap to prepare it for React Email
 */
function preprocessHtml(html: string): string {
  // Fix any double-nested paragraphs
  let processed = html.replace(/<p><p>/g, "<p>").replace(/<\/p><\/p>/g, "</p>");

  // Remove any empty paragraphs
  processed = processed.replace(/<p>\s*<\/p>/g, "");

  // Enhanced list processing - ensure lists have proper structure and styling
  // Improve ul/ol rendering by adding proper table-based structure for email clients
  processed = processed.replace(
    /<ul([^>]*)>([\s\S]*?)<\/ul>/gi,
    (match, attributes, content) => {
      // Process each list item
      const enhancedContent = content.replace(
        /<li([^>]*)>([\s\S]*?)<\/li>/gi,
        '<li$1 style="margin-bottom: 10px; display: list-item; list-style-position: outside; margin-left: 20px;">$2</li>'
      );

      return `<ul${attributes} style="padding-left: 20px; margin-bottom: 20px; display: block;">${enhancedContent}</ul>`;
    }
  );

  // Similarly for ordered lists
  processed = processed.replace(
    /<ol([^>]*)>([\s\S]*?)<\/ol>/gi,
    (match, attributes, content) => {
      // Process each list item
      const enhancedContent = content.replace(
        /<li([^>]*)>([\s\S]*?)<\/li>/gi,
        '<li$1 style="margin-bottom: 10px; display: list-item; list-style-position: outside; margin-left: 20px;">$2</li>'
      );

      return `<ol${attributes} style="padding-left: 20px; margin-bottom: 20px; display: block;">${enhancedContent}</ol>`;
    }
  );

  return processed;
}

/**
 * Email-specific CSS styles for proper formatting
 */
const EMAIL_CSS = `
  /* Base typography */
  body, p, div, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  /* Paragraph spacing */
  p {
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 16px;
    line-height: 1.3;
    font-weight: bold;
  }
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
  h3 { font-size: 18px; }
  h4 { font-size: 16px; }
  h5 { font-size: 14px; }
  h6 { font-size: 13px; }
  
  /* Lists - enhanced for email clients */
  ul, ol {
    margin-bottom: 16px !important;
    padding-left: 40px !important;
    display: block !important;
    list-style-position: outside !important;
  }
  
  li {
    margin-bottom: 8px !important;
    display: list-item !important;
    line-height: 1.5 !important;
  }
  
  /* Explicit styling for list types */
  ul { list-style-type: disc !important; }
  ol { list-style-type: decimal !important; }
  
  /* Blockquotes */
  blockquote {
    margin: 16px 0;
    padding: 8px 16px;
    border-left: 4px solid #e0e0e0;
    background-color: #f9f9f9;
    font-style: italic;
  }
  
  /* Links */
  a {
    color: #007bff;
    text-decoration: underline;
  }
  
  /* Code blocks */
  pre, code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 90%;
  }
  pre {
    padding: 12px;
    margin-bottom: 16px;
    overflow-x: auto;
  }
`;

/**
 * Creates a React Email template with the provided HTML content
 */
function createEmailTemplate(content: string) {
  // We're using createElement directly with React Email components
  // This approach avoids JSX transformation issues in API routes

  const emailTemplate = createElement(
    Html,
    { lang: "en" },
    createElement(
      Head,
      null,
      createElement("title", null, "Email"),
      createElement("meta", { charSet: "utf-8" }),
      createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      }),
      // Add style tag with our CSS
      createElement("style", { type: "text/css" }, EMAIL_CSS)
    ),
    createElement(Preview, null, "Email content"),
    createElement(
      Body,
      {
        style: {
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f5f5",
          margin: "0",
          padding: "0",
        },
      },
      createElement(
        Container,
        {
          style: {
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
        // Create a div element with dangerouslySetInnerHTML
        createElement("div", {
          className: "email-content",
          style: {
            padding: "10px",
            color: "#333333",
            fontSize: "14px",
            lineHeight: "1.5",
          },
          dangerouslySetInnerHTML: { __html: content },
        }),
        createElement(Hr, {
          style: {
            borderTop: "1px solid #e6e6e6",
            margin: "20px 0",
          },
        })
      )
    )
  );

  return emailTemplate;
}

/**
 * API Route handler for transforming TipTap HTML to email-safe HTML
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { html } = body;

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 }
      );
    }

    // Debug: Log the incoming HTML
    // console.log("Input HTML:", html);

    // Preprocess the HTML
    const processedHtml = preprocessHtml(html);

    // Debug: Log the processed HTML
    // console.log("Processed HTML:", processedHtml);

    // Create the email template with React Email
    const emailTemplate = createEmailTemplate(processedHtml);

    // Render the React Email template to HTML - this might return a Promise
    const emailHtmlResult = render(emailTemplate, {
      pretty: true,
    });

    // Properly handle the result whether it's a Promise or not
    let htmlString;

    if (emailHtmlResult instanceof Promise) {
      // If it's a Promise, await it
      const resolvedHtml = await emailHtmlResult;
      htmlString =
        typeof resolvedHtml === "string"
          ? resolvedHtml
          : JSON.stringify(resolvedHtml);

      // Debug: Log the resolved HTML
      console.log(
        "Resolved HTML (from Promise):",
        htmlString.substring(0, 500) + "..."
      );
    } else {
      // If it's not a Promise, handle it directly
      htmlString =
        typeof emailHtmlResult === "string"
          ? emailHtmlResult
          : JSON.stringify(emailHtmlResult);

      // Debug: Log the direct HTML
      console.log("Direct HTML:", htmlString.substring(0, 500) + "...");
    }

    // Return the transformed HTML
    return NextResponse.json({ html: htmlString });
  } catch (error) {
    console.error("Error transforming email:", error);
    return NextResponse.json(
      { error: "Failed to transform email" },
      { status: 500 }
    );
  }
}
