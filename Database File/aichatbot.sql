-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2025 at 12:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aichatbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_history`
--

CREATE TABLE `chat_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('user','bot') NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_history`
--

INSERT INTO `chat_history` (`id`, `user_id`, `role`, `message`, `created_at`) VALUES
(14, 1, 'user', 'Sgwgvagah', '2025-08-25 08:40:44'),
(15, 1, 'bot', 'That sequence of letters, \"Sgwgvagah\", doesn\'t immediately translate to a recognized word or phrase in English or any common language I\'m familiar with.\n\nIs it:\n*   A typo?\n*   A specific code or abbreviation?\n*   Part of a different language?\n*   Just a random string of characters?\n\nCould you provide more context or clarify what you meant by it?', '2025-08-25 08:40:49'),
(16, 1, 'user', 'Gegege', '2025-08-25 08:49:01'),
(17, 1, 'bot', 'Ah, **Gegege no Kitaro**!\n\nThat\'s Kitaro\'s iconic call! From the classic yokai series. Always brings back memories! 😊', '2025-08-25 08:49:05'),
(18, 1, 'user', 'How are you?', '2025-08-25 08:51:54'),
(19, 1, 'bot', 'As an AI, I don\'t have feelings or a physical body, so I don\'t experience \"being\" in the way humans do. However, I\'m functioning perfectly and ready to assist you!\n\nHow can I help you today?', '2025-08-25 08:51:57'),
(20, 1, 'user', 'What is Api context ', '2025-08-25 08:53:07'),
(21, 1, 'bot', 'In the context of APIs, \"API Context\" refers to the **collection of all relevant, non-explicitly passed information that influences how an API request is processed or responded to.**\n\nThink of it as the \"environment\" or \"state\" surrounding a specific API interaction, providing the necessary background for the API to make informed decisions beyond just the immediate data provided in the request body or query parameters.\n\n### What does API Context typically include?\n\nAPI Context can encompass a wide range of data, often derived from the request itself, the user, or the system\'s current state:\n\n1.  **Authentication and Authorization Data:**\n    *   **User ID:** Who is making the request?\n    *   **User Roles/Permissions:** What actions is this user allowed to perform?\n    *   **Session Token/API Key:** Validates the identity of the requester.\n    *   **IP Address:** The source IP of the request (for security, rate limiting, geo-location).\n\n2.  **Request Metadata:**\n    *   **HTTP Headers:** `User-Agent`, `Referer`, `Accept-Language`, `Content-Type`, custom headers (`X-Request-ID`, `X-Correlation-ID`).\n    *   **Timestamp:** When the request was received.\n    *   **Request Method:** GET, POST, PUT, DELETE.\n    *   **URL Path:** The specific endpoint being accessed.\n\n3.  **User Preferences & Localization:**\n    *   **Language:** Based on `Accept-Language` header or user settings.\n    *   **Timezone:** For displaying date/time information correctly.\n    *   **Currency:** For financial applications.\n    *   **Personalized Settings:** Any specific preferences stored for the authenticated user.\n\n4.  **System/Environment Context:**\n    *   **Environment (e.g., \"production\", \"staging\", \"development\"):** Can alter behavior (e.g., logging verbosity, feature flags).\n    *   **Feature Flags/A/B Test Groups:** If the user is part of a specific test group, the API might behave differently.\n    *   **Tracing/Correlation IDs:** For distributed systems, these IDs help track a request across multiple microservices for logging and debugging.\n\n5.  **Session Information:**\n    *   If the API is part of a session-based system, the context might include data related to the ongoing user session.\n\n### Why is API Context important?\n\n*   **Security:** Essential for knowing who is making the request and if they are authorized to perform the requested action.\n*   **Personalization:** Allows APIs to tailor responses based on user preferences, language, location, etc.\n*   **Business Logic:** Enables the API to make more intelligent decisions. For example, a \"checkout\" API needs to know *which user* is checking out and what items are in *their* cart.\n*   **Debugging and Monitoring:** Tracing IDs, timestamps, and source IPs are crucial for understanding system behavior and troubleshooting issues.\n*   **Auditing:** Contextual information helps log and audit actions for compliance and security.\n*   **Rate Limiting:** IP address and user ID are key for preventing abuse.\n\n### How is it typically managed?\n\nIn most API frameworks and server-side code, the API context is often represented by an object that gets created at the beginning of an API request\'s processing lifecycle. This object is then passed down through various layers (middleware, controllers, services) so that every part of the application dealing with that specific request has access to the necessary contextual information without needing to re-extract or re-calculate it.\n\n**Example:**\nImagine an API endpoint `GET /users/{userId}/profile`.\n*   The `userId` in the path is **explicit data**.\n*   The `Authorization` header containing a JWT token, the `Accept-Language` header, and the IP address of the requester are all part of the **API context**.\nThe API logic will use the JWT token from the context to verify the user, ensure they are authorized to view that profile (or *their own* profile), and use the `Accept-Language` to return the profile data in the correct language.', '2025-08-25 08:53:20'),
(22, 1, 'user', 'Give me one name for my girlfriend ', '2025-08-25 09:01:20'),
(23, 1, 'bot', 'How about **Honey**?\n\nIt\'s sweet, warm, and a classic term of endearment.\n\nIf you\'d like a different vibe, tell me what kind of feeling you\'re going for (cute, unique, classic, playful, etc.)!', '2025-08-25 09:01:28'),
(24, 1, 'user', 'Give me another one', '2025-08-25 09:01:36'),
(25, 1, 'bot', 'Sure! What kind of \"another one\" are you looking for?\n\nAre we continuing a previous topic, or looking for something new like a:\n\n*   **Joke?**\n*   **Fact?**\n*   **Story prompt?**\n*   **Riddle?**\n*   **Poem?**\n*   **Idea?**\n*   **Recommendation (book, movie, song)?**\n*   **Brain teaser?**\n\nJust let me know what you have in mind!', '2025-08-25 09:01:40'),
(26, 1, 'user', 'What is your name?', '2025-08-25 09:08:09'),
(27, 1, 'bot', 'I do not have a name. I am a large language model, trained by Google.', '2025-08-25 09:08:10'),
(28, 1, 'user', 'Hahaha', '2025-08-25 09:10:14'),
(29, 1, 'bot', 'Haha! Glad to hear that! What\'s making you laugh? 😄', '2025-08-25 09:10:20'),
(30, 6, 'user', 'Hi', '2025-08-25 09:45:52'),
(31, 6, 'bot', 'Hi there! How can I help you today?', '2025-08-25 09:45:53'),
(32, 6, 'user', 'What is your name?', '2025-08-25 09:46:03'),
(33, 6, 'bot', 'I do not have a name. I am a large language model, trained by Google.', '2025-08-25 09:46:04'),
(34, 6, 'user', 'Can you please help me while creating a chatbot App?', '2025-08-25 09:46:27'),
(35, 6, 'bot', 'That\'s fantastic! Creating a chatbot app is a rewarding project, whether it\'s for personal use, a business, or just to learn. I can definitely help you break down the process.\n\nTo give you the most relevant advice, it\'s helpful if you can tell me a little more about what you have in mind. However, I\'ll start with a comprehensive guide that covers the general steps and considerations, from concept to deployment.\n\n---\n\n## The Complete Guide to Creating a Chatbot App\n\nBuilding a chatbot involves several stages, from defining its purpose to deploying and maintaining it. Here\'s a structured approach:\n\n### Phase 1: Planning and Design (The \"What\" and \"Why\")\n\nThis is the most crucial phase. Don\'t skip it!\n\n1.  **Define Your Chatbot\'s Purpose & Scope:**\n    *   **What problem will it solve?** (e.g., answer FAQs, book appointments, generate leads, provide customer support, offer product recommendations, simply entertain).\n    *   **Who is your target audience?** (e.g., customers, employees, website visitors, students).\n    *   **What specific tasks should it perform?** (List them out, e.g., \"Tell me the store hours,\" \"Reset my password,\" \"Show me hiking boots\").\n    *   **Where will it live?** (e.g., on your website, Facebook Messenger, WhatsApp, Slack, a custom mobile app).\n    *   **What\'s its personality/brand voice?** (Friendly, formal, witty, helpful).\n    *   **What are your success metrics?** (e.g., 80% of questions answered, 10% increase in leads, reduced support calls).\n    *   **Complexity:** Do you need a simple rule-based bot or an advanced AI-driven conversational agent?\n\n2.  **Design the Conversation Flow (User Experience - UX):**\n    *   **Map User Journeys:** For each task, draw out the typical conversation path.\n        *   *Example: Store Hours:* User asks -> Bot provides hours -> User thanks -> Bot offers more help.\n        *   *Example: Booking:* User asks -> Bot asks for details (date, time, service) -> User provides details -> Bot confirms/suggests alternatives.\n    *   **Create a Dialog Tree/Flowchart:** Use tools like Lucidchart, Miro, or even pen and paper to visualize the conversation structure.\n    *   **Identify Intents:** What are the user\'s *intentions*? (e.g., `get_store_hours`, `book_appointment`, `reset_password`).\n    *   **Identify Entities:** What key pieces of information does the bot need to extract from user input? (e.g., `date`, `time`, `service_type`, `product_name`).\n    *   **Error Handling & Fallbacks:** What happens when the bot doesn\'t understand? (e.g., \"Sorry, I didn\'t get that. Could you please rephrase?\", \"Here are some things I can help with...\").\n    *   **Human Handoff Strategy:** When should the bot escalate to a human agent? How will this happen?\n    *   **Rich Media Elements:** Consider using buttons, carousels, images, or quick replies to enhance the UX and guide users.\n\n### Phase 2: Choosing Your Technology (The \"How\")\n\nThis is where you decide on the tools and platforms.\n\n1.  **No-Code/Low-Code Platforms (Recommended for beginners or quick deployment):**\n    *   **Pros:** Easy to use, fast development, often include built-in NLP, hosting, and channel integrations.\n    *   **Cons:** Less flexibility, potential vendor lock-in, may hit limitations for complex scenarios.\n    *   **Examples:**\n        *   **Google Dialogflow ES/CX:** Powerful NLP, easy integration with Google Cloud services, good for voice bots.\n        *   **Microsoft Bot Framework Composer / Azure Bot Service:** Integrates with Azure AI services (LUIS, QnA Maker), good for enterprise.\n        *   **Rasa X:** Open-source framework with a user-friendly interface for building and managing conversational AI. More flexible than pure no-code.\n        *   **ManyChat / Chatfuel / Tidio / Landbot:** Excellent for marketing, sales, and simple customer service on platforms like Facebook Messenger, Instagram, or websites.\n        *   **IBM Watson Assistant:** Robust enterprise-grade solution.\n\n2.  **Custom Development (Code-Based - For maximum flexibility and unique requirements):**\n    *   **Pros:** Complete control, highly customizable, scalable, no vendor lock-in.\n    *   **Cons:** Requires programming skills, longer development time, more complex to set up and maintain.\n    *   **Components you\'ll typically need:**\n        *   **Programming Language:** Python (most common for AI/ML - Flask/Django for web), Node.js (Express for web), Java, C#.\n        *   **NLP/NLU Engine:**\n            *   **Cloud-based:** Google Dialogflow API, IBM Watson Assistant API, Microsoft LUIS (Language Understanding Intelligent Service) API.\n            *   **Open-source libraries:** Rasa (a full framework), spaCy, NLTK (for more granular control if building from scratch).\n        *   **Bot Frameworks:**\n            *   **Microsoft Bot Framework SDK:** For building bots across many channels.\n            *   **Botpress:** Open-source conversational AI platform.\n            *   **Custom Framework:** You can build your own logic using web frameworks like Flask/Django (Python) or Express (Node.js).\n        *   **Database:** If your bot needs to store user data, conversation history, or retrieve dynamic content (e.g., MongoDB, PostgreSQL, MySQL).\n        *   **Hosting:** Where your bot\'s code will live (e.g., AWS, Google Cloud Platform, Azure, Heroku, DigitalOcean).\n\n### Phase 3: Development (The \"Build\")\n\nOnce you\'ve chosen your tools, it\'s time to build!\n\n1.  **Set up Your Environment:** Install necessary SDKs, libraries, and frameworks.\n2.  **Train Your NLP Model (if using a custom or configurable NLP engine):**\n    *   **Define Intents:** Provide multiple example phrases (utterances) for each intent. (e.g., for `get_store_hours`: \"What time do you close?\", \"Are you open on Sundays?\", \"Your hours please\").\n    *   **Annotate Entities:** Mark relevant entities within your training phrases. (e.g., \"I want to book an appointment on **Tuesday** at **2 PM** for **haircut**\").\n    *   **Build Responses:** Define what the bot should say for each intent.\n3.  **Implement Dialog Management:**\n    *   Write the logic that guides the conversation based on intents, entities, and the conversation state.\n    *   Handle context (remembering previous parts of the conversation).\n    *   Manage multi-turn conversations (e.g., \"What day?\" -> User provides day -> \"What time?\").\n4.  **Integrate with Backend Systems (if needed):**\n    *   Connect your chatbot to APIs for fetching data (e.g., product catalog, weather info), performing actions (e.g., booking an appointment, placing an order), or accessing databases.\n5.  **Develop Fallback Responses:** Ensure graceful handling of unexpected inputs.\n\n### Phase 4: Integration and Deployment (The \"Launch\")\n\n1.  **Integrate with Channels:**\n    *   **Web Chat Widget:** Embed a JavaScript widget on your website.\n    *   **Messaging Platforms:** Use platform-specific APIs/SDKs (e.g., Facebook Messenger Platform API, WhatsApp Business API, Slack API, Telegram Bot API).\n    *   **Custom Applications:** Integrate directly into your mobile or desktop app.\n2.  **Deploy Your Bot:**\n    *   If using a no-code platform, deployment is usually a click of a button.\n    *   If custom-coded, deploy your server-side application to your chosen hosting provider (AWS Lambda, Google Cloud Functions, Azure App Service, Heroku, a VM).\n3.  **Set up Monitoring:** Track your bot\'s performance, errors, and user interactions.\n\n### Phase 5: Testing, Iteration, and Maintenance (The \"Improve\")\n\n1.  **Thorough Testing:**\n    *   **Unit Tests:** Test individual components (NLP, API calls).\n    *   **Conversation Tests:** Simulate full user journeys to ensure the flow is logical and robust.\n    *   **Edge Case Testing:** Test unusual or unexpected inputs.\n    *   **User Acceptance Testing (UAT):** Get real users to test the bot and gather feedback.\n2.  **Collect Feedback & Analytics:**\n    *   Monitor user interactions, identify common misunderstandings or \"confusion points.\"\n    *   Analyze conversation logs to find areas for improvement in NLP training or dialog flow.\n    *   Track your success metrics.\n3.  **Iterate and Improve:**\n    *   Continuously refine your NLP model by adding new training phrases.\n    *   Update dialog flows based on user behavior.\n    *   Add new features and capabilities.\n4.  **Maintain:**\n    *   Keep your underlying libraries and frameworks updated.\n    *   Address any bugs or performance issues.\n\n---\n\n### Getting Started - What to Consider First:\n\nTo help me guide you more specifically, consider these questions:\n\n1.  **What is the primary goal of your chatbot?** (e.g., \"I want to build a FAQ bot for my small business website,\" or \"I want to create a fun, interactive story bot for my friends.\")\n2.  **What\'s your technical skill level?** (e.g., \"I\'m a complete beginner,\" \"I know some Python/JavaScript,\" \"I\'m an experienced developer.\")\n3.  **Do you have a budget?** (Some platforms have free tiers but scale up in cost; custom development has infrastructure costs.)\n4.  **How quickly do you want to launch it?** (No-code solutions are faster.)\n\nOnce you have a clearer idea of these points, we can dive into specific recommendations and steps! Let\'s get started!', '2025-08-25 09:46:47'),
(36, 1, 'user', 'Who is Imran Khan', '2025-08-25 09:56:23'),
(37, 1, 'bot', 'Imran Khan is a prominent **Pakistani former international cricketer** who later became a **politician** and served as the **22nd Prime Minister of Pakistan**.\n\nHere\'s a breakdown of his key roles and achievements:\n\n1.  **Cricket Legend:**\n    *   He is widely regarded as one of the greatest all-rounders of all time in the history of cricket.\n    *   He captained the Pakistan national cricket team to victory in the **1992 Cricket World Cup**, which remains Pakistan\'s only World Cup title to date.\n    *   Known for his fast bowling, powerful batting, and charismatic leadership, he played international cricket for Pakistan from 1971 to 1992.\n\n2.  **Philanthropist:**\n    *   After retiring from cricket, he dedicated himself to philanthropy.\n    *   He founded the **Shaukat Khanum Memorial Cancer Hospital & Research Centre** in Lahore, a state-of-the-art cancer hospital, in memory of his mother who died of cancer.\n    *   He also established **Namal College**, a technical and higher education institution.\n\n3.  **Political Leader:**\n    *   He entered politics in 1996, founding his own political party, the **Pakistan Tehreek-e-Insaf (PTI)**, which translates to \'Pakistan Movement for Justice\'.\n    *   His political platform focused on anti-corruption, good governance, and building a \"Naya Pakistan\" (New Pakistan).\n    *   After years in opposition and a gradual increase in popularity, the PTI emerged as the largest party in the 2018 general elections.\n    *   **Prime Minister of Pakistan:** Imran Khan was sworn in as the Prime Minister of Pakistan on August 18, 2018. During his tenure, he focused on social welfare programs, economic reforms, and foreign policy initiatives.\n    *   **Removal from Office:** He was removed from office through a no-confidence motion in the National Assembly in April 2022, becoming the first Pakistani Prime Minister to be ousted by such a vote.\n\nSince his removal from office, Imran Khan has remained a highly prominent and often controversial figure in Pakistani politics, leading protests and rallies against the current government and facing numerous legal challenges and arrests.', '2025-08-25 09:56:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verification_code` int(11) DEFAULT NULL,
  `verification_code_expire` datetime DEFAULT NULL,
  `account_verified` tinyint(1) DEFAULT 0,
  `reset_password_token` varchar(10) DEFAULT NULL,
  `reset_password_expire` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `verification_code`, `verification_code_expire`, `account_verified`, `reset_password_token`, `reset_password_expire`, `created_at`, `updated_at`) VALUES
(1, 'Umer', 'uk302269@gmail.com', '+923135081401', '$2b$10$cexkPI.x5tKj3vbpvgL8WetSBk93KbsND5v/Ks9OmxZOGaYOQyrja', NULL, NULL, 1, NULL, NULL, '2025-08-25 05:55:55', '2025-08-25 05:58:43'),
(6, 'Umer Khan', 'uk302268@gmail.com', '+923705246938', '$2b$10$YaKwpMB4rxDOY0q0MqvQ7ewjf0L6MFs92DhZWfsvvGAYKRZObtOPG', NULL, NULL, 1, '216476', '2025-08-25 15:07:28', '2025-08-25 09:35:36', '2025-08-25 09:52:28'),
(8, 'umar', 'umarkhan6994@gmail.com', '+923546484884', '$2b$10$.qczTZqLdRkt1DwQn4ncRehFnIqc6F39fDBFPTfjZi.u56J2DR.Ha', 333573, '2025-08-25 14:58:01', 0, NULL, NULL, '2025-08-25 09:53:01', '2025-08-25 09:53:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_history`
--
ALTER TABLE `chat_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_history`
--
ALTER TABLE `chat_history`
  ADD CONSTRAINT `chat_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
