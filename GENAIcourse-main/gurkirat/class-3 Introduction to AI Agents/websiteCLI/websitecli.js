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

const openai = new OpenAI();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(q) {
    return new Promise((res) => rl.question(q, res));
}

function sanitizeFilename(s) {
    return s.replace(/[^a-z0-9.\-_]/gi, "_");
}

async function downloadFile(fileUrl, destPath, timeout = 30000) {
    try {
        await mkdirp(path.dirname(destPath));
        const writer = createWriteStream(destPath);
        const response = await axios({
            method: "get",
            url: fileUrl,
            responseType: "stream",
            timeout,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36",
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            },
            maxContentLength: 200 * 1024 * 1024,
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });

        return { success: true };
    } catch (err) {
        return { success: false, error: err.message || String(err) };
    }
}

function resolveUrl(base, resource) {
    if (/^\/\//.test(resource)) {
        const proto = new URL(base).protocol;
        return proto + resource;
    }
    try {
        return new URL(resource, base).href;
    } catch {
        return null;
    }
}

async function analyzeWebsiteWithAI(targetUrl) {
    const SYSTEM_PROMPT = `
You are an AI assistant designed to clone websites. Your job is to help clone the website content, decide what parts to include (e.g., header, footer, images, etc.), and suggest optimizations.

The website has various elements like images, videos, scripts, forms, etc. I need you to:
1. Analyze the website's structure and content.
2. Decide which elements should be cloned and prioritized.
3. Suggest optimizations for the cloned website's layout (e.g., remove unnecessary JS, optimize media files).
4. Ensure the clone works fully offline after the assets are downloaded.

Only respond with a list of actions you recommend for cloning and their order (in JSON format, with 'step' and 'content' fields).
Do not explain anything.
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-mini", // or "gpt-4.1-mini" if available
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Target website: ${targetUrl}` },
        ],
    });

    const rawContent = response.choices[0].message.content;
    try {
        const parsedContent = JSON.parse(rawContent);
        return parsedContent;
    } catch (error) {
        console.error("AI response was not valid JSON:", rawContent);
        return null;
    }
}

async function processElements($, targetUrl, selector, attrName, assetFolder) {
    const elements = $(selector).toArray();
    console.log(`Found ${elements.length} elements for ${selector}`);
    for (const el of elements) {
        const attrib = $(el).attr(attrName);
        if (!attrib) continue;

        const resolved = resolveUrl(targetUrl, attrib.trim());
        if (!resolved) {
            console.warn(`Skipping invalid URL: ${attrib}`);
            continue;
        }

        try {
            const urlObj = new URL(resolved);
            const extFromPath = path.extname(urlObj.pathname).split("?")[0] || "";
            let baseName = sanitizeFilename(path.basename(urlObj.pathname) || "asset");
            if (!baseName.includes(".")) baseName += extFromPath;
            const destPath = path.join(assetFolder, baseName);

            try {
                await fs.access(destPath); // already downloaded
                continue;
            } catch { }

            const result = await downloadFile(resolved, destPath);
            if (result.success) {
                console.log(`✅ Downloaded: ${resolved}`);
                $(el).attr(attrName, `assets/${path.basename(assetFolder)}/${baseName}`);
            } else {
                console.error(`❌ Failed: ${resolved} - ${result.error}`);
            }
        } catch (err) {
            console.error(`⚠️ Error processing: ${err.message}`);
        }
    }
}

async function scrapeAndClone(targetUrl, outDir = "cloned-site") {
    await mkdirp(outDir);

    const assets = {
        images: path.join(outDir, "assets", "images"),
        videos: path.join(outDir, "assets", "videos"),
        css: path.join(outDir, "assets", "css"),
        js: path.join(outDir, "assets", "js"),
        fonts: path.join(outDir, "assets", "fonts"),
    };

    for (const folder of Object.values(assets)) {
        await mkdirp(folder);
    }

    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36"
    );

    try {
        await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 60000 });
        await new Promise(res => setTimeout(res, 1500)); // use instead of page.waitForTimeout()

        const html = await page.content();
        const $ = cheerio.load(html, { decodeEntities: false });

        const cloningPlan = await analyzeWebsiteWithAI(targetUrl);

        if (!cloningPlan) {
            console.error("❌ AI did not return a valid cloning plan.");
            return;
        }

        console.log("🧠 AI Cloning Plan:");
        console.table(cloningPlan);

        for (const step of cloningPlan) {
            const action = typeof step.step === 'string' ? step.step.toLowerCase() : '';

            if (action.includes("image")) {
                console.log("🖼️ Downloading images...");
                await processElements($, targetUrl, "img", "src", assets.images);
            }
            if (action.includes("video")) {
                console.log("🎬 Downloading videos...");
                await processElements($, targetUrl, "video", "src", assets.videos);
                await processElements($, targetUrl, "video source", "src", assets.videos);
            }
            if (action.includes("css")) {
                console.log("🎨 Downloading CSS...");
                await processElements($, targetUrl, 'link[rel="stylesheet"]', "href", assets.css);
            }
            if (action.includes("js") || action.includes("script")) {
                console.log("📜 Downloading JS...");
                await processElements($, targetUrl, "script[src]", "src", assets.js);
            }
        }

        const finalHtml = $.html({ decodeEntities: false });
        await fs.writeFile(path.join(outDir, "index.html"), finalHtml, "utf-8");

        console.log(`✅ Cloning complete. Open '${path.join(outDir, "index.html")}' in a browser.`);
    } catch (err) {
        console.error("🔥 Error during scrape:", err.message);
    } finally {
        await browser.close();
    }
}

async function main() {
    const targetUrl = await question("Enter the website URL to clone: ");
    await scrapeAndClone(targetUrl.trim());
    rl.close();
}

main();


