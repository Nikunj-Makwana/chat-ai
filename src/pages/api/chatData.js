import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; 

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, SECRET_KEY);

        const sidebarData = [
            {
                "heading": "Your conversation",
                "list": [
                    {
                        "id": "create-html-game-environment",
                        "title": "Create Html Game Environment",
                        "question": "How can I create an HTML game environment using basic web technologies?",
                        "description": "<p><strong>Creating an HTML game environment</strong> involves combining HTML, CSS, and JavaScript. You use HTML5 <code>&lt;canvas&gt;</code> for rendering visuals, CSS for styling, and JavaScript to handle game logic, controls, and animation loops. Libraries like Phaser.js or p5.js can simplify development. Ensure your game loop runs at 60fps and manage state efficiently.</p>"
                    },
                    {
                        "id": "apply-to-leave-for-emargancy",
                        "title": "Apply To Leave For Emargancy",
                        "question": "How to write a proper leave application for emergency situations?",
                        "description": "<p><strong>To apply for leave due to an emergency</strong>, you should mention the reason briefly and professionally. Example:<br/><em>“I am writing to request an emergency leave due to a personal matter that requires immediate attention. Please consider my leave from [start date] to [end date]. I will ensure that all urgent responsibilities are handed over appropriately.”</em></p>"
                    },
                    {
                        "id": "what-is-uiux-design",
                        "title": "What IS UIUX Design?",
                        "question": "What is UI/UX Design and why is it important in modern applications?",
                        "description": "<p><strong>UI (User Interface)</strong> design refers to the visual elements users interact with—buttons, layouts, colors. <strong>UX (User Experience)</strong> focuses on how users feel while interacting—how easy, intuitive, or frustrating it is. Together, they ensure a product is both functional and delightful to use, directly impacting user satisfaction and success rates.</p>"
                    },
                    {
                        "id": "create-pos-system",
                        "title": "Create POS System",
                        "question": "How to build a complete Point of Sale (POS) system?",
                        "description": "<p><strong>To build a POS system</strong>, you need:</p><ul><li><strong>Frontend:</strong> React/Angular for managing sales, cart, and checkout.</li><li><strong>Backend:</strong> Node.js or Django with APIs for inventory, billing, and reporting.</li><li><strong>Database:</strong> MySQL or MongoDB.</li><li><strong>Features:</strong> product management, barcode scanning, billing, user roles, and analytics.</li></ul>"
                    },
                    {
                        "id": "what-is-ux-audit",
                        "title": "What is UX AUdit?",
                        "question": "What is a UX audit and how does it help product development?",
                        "description": "<div style=\"font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;\"><p><strong>A UX audit</strong> (User Experience audit) is a process where a digital product—like a website, mobile app, or software—is evaluated to identify usability issues and areas for improvement in the user experience.</p><h3>🛠️ What it Involves:</h3><ul><li><strong>Heuristic Evaluation:</strong> Checking the product against established usability principles.</li><li><strong>User Flow Analysis:</strong> Looking at how users navigate and identifying friction points.</li><li><strong>Accessibility Checks:</strong> Making sure the product works for people with disabilities.</li><li><strong>Analytics Review:</strong> Examining data (e.g. drop-off rates, bounce rates) to see where users struggle.</li><li><strong>Competitor Benchmarking:</strong> Comparing your product with competitors for best practices.</li></ul><h3>🔍 Typical Outcomes:</h3><ul><li><strong>UX issues</strong></li><li><strong>Suggestions for improvement</strong></li><li><strong>Visual/UI inconsistencies</strong></li><li><strong>Prioritized recommendations</strong></li></ul><h3>🧑‍💻 Why It’s Done:</h3><ul><li><strong>Improve conversion rates</strong></li><li><strong>Enhance user satisfaction</strong></li><li><strong>Reduce support tickets</strong></li><li><strong>Make redesigns more strategic and data-driven</strong></li></ul><p><strong>It’s basically a health check for your product’s user experience.</strong></p><p><em>Want an example UX audit checklist or template?</em></p></div>"
                    },
                    {
                        "id": "create-chatbot-gpt",
                        "title": "Create Chatbot GPT ",
                        "question": "Create Chatbot GPT using python language what will be setup for that",
                        "description": "<p><strong>To create a Chatbot using GPT with Python</strong>, follow these steps:</p><ol><li><strong>Install OpenAI SDK:</strong> <code>pip install openai</code></li><li><strong>Set your API key:</strong> from environment or secret file</li><li><strong>Use the API:</strong><pre><code>response = openai.ChatCompletion.create( model=\"gpt-4\", messages=[{\"role\": \"user\", \"content\": \"Hello\"}] )</code></pre></li><li><strong>Handle state and conversation flow</strong> using Flask or Django for web integration.</li></ol>"
                    },
                    {
                        "id": "how-chat-gpt-work",
                        "title": "How Chat GPT WOrk?",
                        "question": "How does ChatGPT work internally?",
                        "description": "<p><strong>ChatGPT</strong> works using a deep learning model called Transformer, specifically trained on large datasets through Reinforcement Learning from Human Feedback (RLHF). It predicts the next best token in a sentence based on the input context, which allows it to generate coherent and human-like responses in real time.</p>"
                    }
                ]
            },
            {
                "heading": "Last 7 Days",
                "list": [
                    {
                        "id": "crypto-landing-app-name",
                        "title": "Crypto Landing APP Name",
                        "question": "Suggest a unique and catchy name for a crypto landing application.",
                        "description": "<p><strong>A good crypto landing app name</strong> should sound futuristic, trustworthy, and relevant. Examples: CryptoNest, CoinVault, BitHub, ChainSpot. Use tools like Namelix or NameMesh to generate ideas based on keywords.</p>"
                    },
                    {
                        "id": "operator-grammar-types",
                        "title": "Operator Grammer Types",
                        "question": "What are the types of grammar based on operators in programming languages?",
                        "description": "<p><strong>Operator grammar</strong> usually refers to grammar classifications like:</p><ul><li><strong>Left Recursive</strong></li><li><strong>Right Recursive</strong></li><li><strong>Ambiguous Grammar</strong></li><li><strong>Operator Precedence Grammar</strong></li></ul><p>They define how parsers handle mathematical or logical operations in languages.</p>"
                    },
                    {
                        "id": "min-state-for-binary-dfa",
                        "title": "Min State For Bianory DFA",
                        "question": "How many minimum states are required for a DFA accepting binary strings divisible by 3?",
                        "description": "<p><strong>A DFA accepting binary numbers divisible by 3</strong> needs <strong>3 states</strong>. Each state represents the remainder (0, 1, 2) when the binary number is divided by 3. The transitions depend on the current remainder and the input digit (0 or 1).</p>"
                    }
                ]
            }
        ]

        return res.status(200).json({ data: sidebarData });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
