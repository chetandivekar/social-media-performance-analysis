# Social Lens 🔍

A powerful social media analysis platform built with LangFlow, AstraDB, and Next.js that provides deep insights into social media data.

## Features ✨

- Real-time social media data processing
- Advanced sentiment analysis using LangFlow
- Scalable data storage with AstraDB
- Modern, responsive UI built with Next.js
- Customizable analytics dashboard
- Multi-platform social media integration

## Tech Stack 🛠️

- **Frontend**: Next.js 14
- **Database**: AstraDB
- **AI/ML Pipeline**: LangFlow
- **Styling**: Tailwind CSS
- **API**: REST

## LangFlow Pipeline Overview 📊

![LangFlow Pipeline](/public/langflow.png)

## Prerequisites 📋

- Node.js (v18 or higher)
- AstraDB account and database
- LangFlow installation
- Environment variables setup

## Installation 🚀

1. Clone the repository:

```bash
git clone https://github.com/chetandivekar/social-media-performance-analysis
cd social-media-performance-analysis
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
ASTRADB_TOKEN=your_token_here
ASTRADB_DATABASE=your_database_name
LANGFLOW_API_URL=your_langflow_url
```

4. Run the development server:

```bash
npm run dev
```

## Configuration ⚙️

### AstraDB Setup

1. Create an AstraDB account
2. Create a new database
3. Generate an application token
4. Configure your database connection in `config/astradb.js`

### LangFlow Configuration

1. Set up your LangFlow pipeline
2. Configure the analysis workflows
3. Connect to your application using the API key

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support 💬

For support and questions, please:

- Open an issue
- Join our Discord community
- Contact our support team

## Acknowledgments 🙏

- AstraDB team for the excellent database service
- LangFlow community for AI/ML pipeline tools
- Next.js team for the amazing framework
