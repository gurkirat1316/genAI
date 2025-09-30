// import { OpenAI } from "openai";
// import 'dotenv/config';
// import { exec } from "child_process";
// import puppeteer from "puppeteer";
// import fs from "fs/promises";
// import readline from "readline";

// const client = new OpenAI();

// // ----------------------
// // TOOL DEFINITIONS
// // ----------------------
// async function scrape_website(url = "") {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     try {
//         await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
//         const content = await page.evaluate(() => document.body.innerText);
//         await browser.close();
//         return content;
//     } catch (error) {
//         await browser.close();
//         throw new Error(`Failed to scrape ${url}: ${error.message}`);
//     }
// }

// async function CODE(input = "", data = null, filepath = null) {
//     // Case 1: Writing to file
//     if (data && filepath) {
//         try {
//             await fs.writeFile(filepath, data, "utf-8");
//             return `✅ File written: ${filepath}`;
//         } catch (err) {
//             return `❌ Error writing file ${filepath}: ${err.message}`;
//         }
//     }

//     // Case 2: Running shell commands
//     return new Promise((res) => {
//         exec(input, (error, stdout, stderr) => {
//             if (error) {
//                 res(`❌ Error running command: ${stderr || error.message}`);
//             } else {
//                 res(`✅ Command executed: ${stdout || input}`);
//             }
//         });
//     });
// }

// const TOOL_MAP = {
//     scrape_website,
//     CODE,
//     code: CODE, // lowercase alias
// };

// // Create readline interface for CLI interaction
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// // Function to prompt user input in CLI
// function askQuestion(query) {
//     return new Promise(resolve => rl.question(query, resolve));
// }

// // ----------------------
// // MAIN LOGIC
// // ----------------------
// // const link = process.argv[2];
// // - Use javascript only not typescript
// //         - Make sure to add npm install tailwindcss @tailwindcss/vite package so that when i run npm install i donot need to run this command explicitly
// //         - When using vite use these commands: 
// //             npm create vite@latest my-project
// //             cd my-project
// //             npm install tailwindcss @tailwindcss/vite
// //         - Replace vite.config.js with this: 
// //             import { defineConfig } from 'vite'
// //             import react from '@vitejs/plugin-react'
// //             import tailwindcss from '@tailwindcss/vite'

// //             // https://vite.dev/config/
// //             export default defineConfig({
// //                 plugins: [react(), tailwindcss()],
// //             })
// //         - In the index.css write this line:
// //             @import "tailwindcss";
// //         - Use UI components from Acerternity UI, Magic UI or any other UI available on the internet.

// async function main() {
//     console.log("\n🚀 Welcome to Website Cloner CLI! 🚀\n");
//     console.log("I am your expert AI assistant to clone websites from any URL you provide.");
//     console.log("Just enter the URL of the website you want to clone, and I will do the rest.\n");

//     const link = await askQuestion("Please enter the website URL to clone: ");
//     rl.close();

//     if (!link || !link.startsWith("http")) {
//         console.error("❌ Invalid URL. Please run again and enter a valid http/https URL.");
//         process.exit(1);
//     }

//     const SYSTEM_PROMPT = `You are an expert web developer AI assistant that creates functional clones of websites from URLs.

//         Your Mission:
//         - When given a URL, analyze it, scrape its structure and content.
//         - Create a complete clone using modern web technologies like HTML, CSS, JS        

//         Core Process:
//         1. Analyze the target website (layout, content, styling)
//         2. Plan how to scrape it
//         3. Use scrape_website to extract content
//         4. Generate the code for a new website project
//         5. Use CODE to either run shell commands (create folders/files) or directly write code into files
//         6. In case if there are some pictures in the website then download them and use them in the clone
//         7. Confirm the clone is ready

//         Strict Rules:
//         - ALWAYS respond in strict JSON compatible with response_format: { type: "json_object" }
//         - Follow the exact sequence: START → THINK → TOOL → OBSERVE → THINK → TOOL → … → OUTPUT
//         - Only perform one step at a time, wait for OBSERVE after each TOOL call
//         - Multiple THINK steps are encouraged for detailed reasoning
//         - Do NOT output explanations outside of JSON
//         - Do NOT invent new tools — only use available tools
//         - CODE has two modes:
//             • If only "input" is provided → execute as a shell command
//             • If "filepath" + "data" are provided → write "data" into the specified file
//         - Use scrape_website to extract the target website’s content

//         JSON Format (must match exactly):
//         {
//             "step": "START|THINK|TOOL|OBSERVE|OUTPUT",
//             "content": "description of what you are doing",
//             "tool_name": "scrape_website|CODE",
//             "input": "string input for the tool (used only for shell commands)",
//             "filepath": "path to file (required only when writing code)",
//             "data": "file contents (required only when writing code)"
//         }`;

//     const messages = [
//         { role: "system", content: SYSTEM_PROMPT },
//         { role: "user", content: link },
//     ];

//     let lastResponse = null;

//     while (true) {
//         const response = await client.chat.completions.create({
//             model: "gpt-4.1-mini",
//             messages: messages,
//         });

//         const rawContent = response.choices[0].message.content;
//         let parsedContent;
//         try {
//             parsedContent = JSON.parse(rawContent);
//         } catch (e) {
//             console.error("Invalid JSON from model:", rawContent);
//             continue;
//         }

//         lastResponse = parsedContent;

//         messages.push({
//             role: "assistant",
//             content: JSON.stringify(parsedContent),
//         });

//         if (parsedContent.step === "START") {
//             console.log(`🔥`, parsedContent.content);
//             continue;
//         }

//         if (parsedContent.step === "THINK") {
//             console.log(`\t🧠`, parsedContent.content);
//             continue;
//         }

//         if (parsedContent.step === "TOOL") {
//             const toolToCall = parsedContent.tool_name;
//             if (!TOOL_MAP[toolToCall]) {
//                 messages.push({
//                     role: "developer",
//                     content: `There is no such tool as ${toolToCall}`,
//                 });
//                 continue;
//             }

//             const responseFromTool = await TOOL_MAP[toolToCall](
//                 parsedContent.input,
//                 parsedContent.data,
//                 parsedContent.filepath
//             );

//             console.log(
//                 `🛠️: ${toolToCall}(${parsedContent.input || parsedContent.filepath || ""}) = `,
//                 responseFromTool
//             );

//             messages.push({
//                 role: "developer",
//                 content: JSON.stringify({ step: "OBSERVE", content: responseFromTool }),
//             });
//             continue;
//         }

//         if (parsedContent.step === "OUTPUT") {
//             console.log(`🤖`, parsedContent.content);
//             break;
//         }
//     }

//     console.log("Done...");
//     console.log("Last AI response:", lastResponse);
// }

// main();







// https://www.piyushgarg.dev/
// clone.js
import puppeteer from "puppeteer";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import * as cheerio from 'cheerio';
import { mkdirp } from "mkdirp";
import { createWriteStream } from "fs";
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface for CLI input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Promisify readline question
const question = (q) => new Promise((res) => rl.question(q, res));

// Sanitize filenames to be safe across platforms
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
};

// Download a file with proper error handling and timeout
async function downloadFile(fileUrl, destPath, timeout = 30000) {
    try {
        // Ensure directory exists
        await mkdirp(path.dirname(destPath));
        
        const writer = createWriteStream(destPath);
        
        const response = await axios({
            method: "get",
            url: fileUrl,
            responseType: "stream",
            timeout,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "*/*"
            },
            maxContentLength: 100 * 1024 * 1024, // 100MB max
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => resolve({ success: true }));
            writer.on("error", (err) => reject({ success: false, error: err.message }));
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// Resolve relative URLs to absolute URLs
function resolveUrl(base, relative) {
    try {
        // Handle protocol-relative URLs
        if (relative.startsWith("//")) {
            const baseUrl = new URL(base);
            return `${baseUrl.protocol}${relative}`;
        }
        
        return new URL(relative, base).href;
    } catch {
        return null;
    }
}

// Process and download assets based on selectors
async function processAssets($, baseUrl, selector, attribute, outputDir, assetType) {
    const elements = $(selector).toArray();
    console.log(`Processing ${elements.length} ${assetType} assets...`);
    
    const downloaded = new Set();
    
    for (const element of elements) {
        const assetUrl = $(element).attr(attribute);
        if (!assetUrl) continue;
        
        const absoluteUrl = resolveUrl(baseUrl, assetUrl.trim());
        if (!absoluteUrl) {
            console.warn(`⚠️ Skipping invalid URL: ${assetUrl}`);
            continue;
        }
        
        // Avoid downloading duplicates
        if (downloaded.has(absoluteUrl)) continue;
        downloaded.add(absoluteUrl);
        
        try {
            const urlObj = new URL(absoluteUrl);
            const filename = sanitizeFilename(path.basename(urlObj.pathname) || `asset-${Date.now()}`);
            const outputPath = path.join(outputDir, filename);
            
            // Skip if already downloaded
            try {
                await fs.access(outputPath);
                console.log(`✓ Already exists: ${filename}`);
                continue;
            } catch {}
            
            const result = await downloadFile(absoluteUrl, outputPath);
            
            if (result.success) {
                console.log(`✅ Downloaded: ${filename}`);
                // Update element's attribute to point to local file
                $(element).attr(attribute, `assets/${assetType}/${filename}`);
            } else {
                console.error(`❌ Failed to download ${filename}: ${result.error}`);
            }
        } catch (err) {
            console.error(`❌ Error processing ${assetUrl}: ${err.message}`);
        }
    }
}

// Main cloning function
async function cloneWebsite(url, outputDir = "cloned-site") {
    console.log(`\n🚀 Starting to clone: ${url}\n`);
    
    // Create output directories
    const dirs = {
        root: outputDir,
        assets: path.join(outputDir, "assets"),
        images: path.join(outputDir, "assets", "images"),
        styles: path.join(outputDir, "assets", "css"),
        scripts: path.join(outputDir, "assets", "js"),
        fonts: path.join(outputDir, "assets", "fonts")
    };
    
    for (const dir of Object.values(dirs)) {
        await mkdirp(dir);
    }
    
    // Launch browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        console.log("📄 Fetching page content...");
        await page.goto(url, {
            waitUntil: ["networkidle0", "domcontentloaded"],
            timeout: 60000
        });
        
        // Get page content and load into cheerio
        const html = await page.content();
        const $ = cheerio.load(html, { decodeEntities: false });
        
        // Process different types of assets
        console.log("\n🖼️ Downloading images...");
        await processAssets($, url, "img", "src", dirs.images, "images");
        await processAssets($, url, "img", "data-src", dirs.images, "images");
        
        console.log("\n🎨 Downloading stylesheets...");
        await processAssets($, url, "link[rel='stylesheet']", "href", dirs.styles, "css");
        
        console.log("\n📜 Downloading scripts...");
        await processAssets($, url, "script[src]", "src", dirs.scripts, "js");
        
        // Save the modified HTML
        const finalHtml = $.html({ decodeEntities: false });
        const indexPath = path.join(outputDir, "index.html");
        await fs.writeFile(indexPath, finalHtml, "utf-8");
        
        console.log(`\n✅ Website cloned successfully!\n`);
        console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
        console.log(`📂 Open ${indexPath} in your browser to view the cloned site\n`);
        
    } catch (err) {
        console.error(`\n❌ Error cloning website: ${err.message}\n`);
    } finally {
        await browser.close();
    }
}

// CLI entry point
async function main() {
    try {
        const url = await question("Enter website URL to clone: ");
        if (!url.trim()) {
            throw new Error("URL cannot be empty");
        }
        
        await cloneWebsite(url.trim());
    } catch (err) {
        console.error(`\n❌ Error: ${err.message}\n`);
    } finally {
        rl.close();
    }
}

// Start the program
main();