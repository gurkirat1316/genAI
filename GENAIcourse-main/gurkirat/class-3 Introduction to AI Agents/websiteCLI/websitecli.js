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
import { OpenAI } from "openai";
import 'dotenv/config';
import figlet from "figlet";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI client
const openai = new OpenAI();

// System prompt for the AI agent
const SYSTEM_PROMPT = `You are an expert web scraping and cloning AI assistant.
Your task is to analyze websites and guide the cloning process intelligently.

Your capabilities:
1. Analyze webpage structure and content
2. Identify key elements to clone:
   - Important images, styles, and scripts
   - Critical UI components
   - Interactive elements
3. Provide intelligent scraping strategies
4. Suggest optimizations for the cloning process

For each webpage, you should:
1. Analyze the overall structure
2. Identify critical components
3. Suggest the best approach for cloning
4. Monitor the cloning process
5. Verify the completeness of the clone

Always maintain the original website's:
- Visual hierarchy
- Functionality
- Asset organization
- Performance optimizations`;

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promisify readline question
const question = (q) => new Promise((res) => rl.question(q, res));

// Sanitize filenames
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
};

// AI analysis function
async function analyzeWebsite(url, html) {
    console.log("\n🤖 AI Agent: Analyzing website structure...");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `Analyze this website: ${url}\n\nProvide a structured analysis of the key components to clone, including critical assets and structure. Format the response in a clear, actionable way.` }
            ],
            temperature: 0.7,
        });

        const analysis = response.choices[0].message.content;
        console.log("\n📊 AI Analysis Results:");
        console.log(analysis);
        return analysis;
    } catch (error) {
        console.error("\n❌ AI Analysis Error:", error.message);
        return null;
    }
}

// Enhanced download function with AI-powered retry strategy
async function downloadFile(fileUrl, destPath, timeout = 30000) {
    console.log(`\n🔄 Attempting to download: ${fileUrl}`);

    try {
        await mkdirp(path.dirname(destPath));
        const writer = createWriteStream(destPath);

        const response = await axios({
            method: "get",
            url: fileUrl,
            responseType: "stream",
            timeout,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "*/*"
            },
            maxContentLength: 100 * 1024 * 1024, // 100MB max
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", () => {
                console.log(`✅ Successfully downloaded: ${path.basename(destPath)}`);
                resolve({ success: true });
            });
            writer.on("error", async (err) => {
                console.error(`❌ Download failed: ${err.message}`);

                // AI-powered retry strategy
                try {
                    const retryStrategy = await openai.chat.completions.create({
                        model: "gpt-4.1-mini",
                        messages: [
                            { role: "system", content: "You are an expert in handling failed downloads. Suggest alternative approaches." },
                            { role: "user", content: `Download failed for ${fileUrl} with error: ${err.message}. Suggest alternative approach.` }
                        ]
                    });

                    console.log("\n🤖 AI Suggestion for retry:", retryStrategy.choices[0].message.content);
                } catch (aiError) {
                    console.error("❌ AI retry strategy failed:", aiError.message);
                }

                reject({ success: false, error: err.message });
            });
        });
    } catch (err) {
        return { success: false, error: err.message };
    }
}

// Enhanced URL resolution with AI validation
async function resolveUrl(base, relative) {
    try {
        if (relative.startsWith("//")) {
            const baseUrl = new URL(base);
            return `${baseUrl.protocol}${relative}`;
        }

        const resolvedUrl = new URL(relative, base).href;

        // AI validation of URL
        try {
            const urlValidation = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Validate if this URL appears legitimate and safe to clone." },
                    { role: "user", content: `Is this URL safe to clone: ${resolvedUrl}?` }
                ]
            });

            const validation = urlValidation.choices[0].message.content;
            if (validation.toLowerCase().includes("unsafe") || validation.toLowerCase().includes("suspicious")) {
                console.warn(`⚠️ AI flagged URL as potentially unsafe: ${resolvedUrl}`);
                return null;
            }
        } catch (aiError) {
            console.error("❌ AI URL validation failed:", aiError.message);
        }

        return resolvedUrl;
    } catch {
        return null;
    }
}

// Process assets with AI optimization
async function processAssets($, baseUrl, selector, attribute, outputDir, assetType) {
    const elements = $(selector).toArray();
    console.log(`\n🔍 Processing ${elements.length} ${assetType} assets...`);

    try {
        // Get AI recommendations for asset processing
        const assetStrategy = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: "Provide optimization strategy for processing web assets." },
                { role: "user", content: `Suggest best approach for processing ${elements.length} ${assetType} assets from ${baseUrl}` }
            ]
        });

        console.log("\n🤖 AI Asset Strategy:");
        console.log(assetStrategy.choices[0].message.content);
    } catch (aiError) {
        console.error("❌ AI strategy generation failed:", aiError.message);
    }

    const downloaded = new Set();

    for (const element of elements) {
        const assetUrl = $(element).attr(attribute);
        if (!assetUrl) continue;

        const absoluteUrl = await resolveUrl(baseUrl, assetUrl.trim());
        if (!absoluteUrl) continue;

        if (downloaded.has(absoluteUrl)) continue;
        downloaded.add(absoluteUrl);

        try {
            const urlObj = new URL(absoluteUrl);
            let baseFilename = urlObj.pathname.split('/').pop() || `asset-${Date.now()}`;
            baseFilename = sanitizeFilename(baseFilename);

            let filename = baseFilename;

            // AI-powered file type detection
            try {
                const fileTypeAnalysis = await openai.chat.completions.create({
                    model: "gpt-4.1-mini",
                    messages: [
                        { role: "system", content: "Determine appropriate file extension based on asset type and URL" },
                        { role: "user", content: `Suggest appropriate extension for: ${absoluteUrl} (Type: ${assetType})` }
                    ]
                });

                const suggestedExtension = fileTypeAnalysis.choices[0].message.content;

                // Extract the first .xxx extension from the response using regex
                const extensionMatch = suggestedExtension.match(/\.\w+/);
                let extension = extensionMatch ? extensionMatch[0] : "";

                if (extension) {
                    filename = filename.replace(/\.[^/.]+$/, "") + extension;
                }
            } catch (aiError) {
                console.error("❌ AI file type detection failed:", aiError.message);

                // Fallback to traditional extension assignment
                if (assetType === "images") filename = filename.replace(/\.[^/.]+$/, "") + ".jpg";
                if (assetType === "css" && !filename.endsWith(".css")) filename += ".css";
                if (assetType === "js" && !filename.endsWith(".js")) filename += ".js";
            }

            const outputPath = path.join(outputDir, filename);

            try {
                await fs.access(outputPath);
                console.log(`✓ Already exists: ${filename}`);
                continue;
            } catch { }

            const result = await downloadFile(absoluteUrl, outputPath);

            if (result.success) {
                $(element).attr(attribute, `assets/${assetType}/${filename}`);
            }
        } catch (err) {
            console.error(`❌ Error processing ${absoluteUrl}: ${err.message}`);
        }
    }
}

// Main cloning function with AI assistance
async function cloneWebsite(url, outputDir = "cloned-site") {
    console.log(`\n🚀 Starting AI-powered website clone: ${url}\n`);

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

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Setting the headers directly (including the User-Agent)
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });

        console.log("📄 Fetching page content...");
        await page.goto(url, {
            waitUntil: ["networkidle0", "domcontentloaded"],
            timeout: 60000
        });

        const html = await page.content();
        const $ = cheerio.load(html, { decodeEntities: false });

        // AI Analysis
        await analyzeWebsite(url, html);

        // Process assets with AI assistance
        console.log("\n🖼️ Processing images...");
        await processAssets($, url, "img", "src", dirs.images, "images");
        await processAssets($, url, "img", "data-src", dirs.images, "images");

        console.log("\n🎨 Processing stylesheets...");
        await processAssets($, url, "link[rel='stylesheet']", "href", dirs.styles, "css");

        console.log("\n📜 Processing scripts...");
        await processAssets($, url, "script[src]", "src", dirs.scripts, "js");

        // Save modified HTML
        const finalHtml = $.html({ decodeEntities: false });
        const indexPath = path.join(outputDir, "index.html");
        await fs.writeFile(indexPath, finalHtml, "utf-8");

        // AI Verification
        try {
            const verification = await openai.chat.completions.create({
                model: "gpt-4.1-mini",
                messages: [
                    { role: "system", content: "Verify the completeness and quality of the website clone." },
                    { role: "user", content: `Verify the clone results for ${url}:\n- ${Object.keys(dirs).length} directories created\n- HTML file saved at ${indexPath}` }
                ]
            });

            console.log("\n🤖 AI Verification:");
            console.log(verification.choices[0].message.content);
        } catch (aiError) {
            console.error("❌ AI verification failed:", aiError.message);
        }

        console.log(`\n✅ Website cloned successfully!\n`);
        console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
        console.log(`📂 Open ${indexPath} in your browser to view the cloned site\n`);

    } catch (err) {
        console.error(`\n❌ Error cloning website: ${err.message}\n`);
    } finally {
        await browser.close();
    }
}

// Main CLI function
async function main() {
    try {
        console.clear();

        // Display big fancy text
        const banner = figlet.textSync("Website Cloner CLI", {
            font: "Standard", // You can change the font if desired
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
        });

        console.log(chalk.cyanBright(banner));

        // Additional description
        console.log(chalk.greenBright("\n🤖 Welcome to the AI-Powered Website Cloner!"));
        console.log(chalk.yellow("This tool uses OpenAI + Puppeteer to intelligently clone websites.\n"));

        console.log(chalk.magentaBright("Capabilities:"));
        console.log(chalk.white(`  - 🔍 Analyze page structure with AI`));
        console.log(chalk.white(`  - 🖼️ Download and organize assets (images, CSS, JS)`));
        console.log(chalk.white(`  - 🧠 Use AI to optimize and verify cloned pages`));
        console.log(chalk.white(`  - 📦 Save everything into a structured folder\n`));

        const url = await question(chalk.blue("🌐 Enter website URL to clone: "));
        if (!url.trim()) {
            throw new Error("URL cannot be empty");
        }

        await cloneWebsite(url.trim());

    } catch (err) {
        console.error(chalk.red(`\n❌ Error: ${err.message}\n`));
    } finally {
        rl.close();
    }
}

// Start the program
main();