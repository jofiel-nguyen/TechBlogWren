# Tech Blog

## Overview

This repository hosts the code for a tech blog project. In the ever-evolving world of technology, sharing knowledge and experiences is essential. This project aims to provide a platform for developers to create, publish, and engage with technical content.

## Project Description

In the tech industry, writing about technology is just as vital as coding it. Developers spend a significant amount of time crafting applications and debugging code. Still, they also dedicate time to explore, learn, and share their insights into technical concepts, recent advancements, and emerging technologies.

### Objective

The primary objective of this project is to build a Content Management System (CMS)-style blog site. It draws inspiration from popular platforms like WordPress, where developers can publish their blog posts and engage with others by commenting on their posts. 

### Key Features

- **User Authentication**: The project incorporates user authentication, allowing registered users to create, edit, and delete their blog posts.
  
- **Blog Post Management**: Users can create new blog posts, edit existing ones, and delete posts they no longer wish to maintain.
  
- **Comments**: Developers can engage in discussions by leaving comments on each other's blog posts.
  
- **MVC Architecture**: The project follows the Model-View-Controller (MVC) architectural pattern, ensuring a clear separation of concerns in the codebase.
  
- **Handlebars.js Templating**: Handlebars.js is used as the templating language to dynamically generate HTML for the application.
  
- **Sequelize ORM**: Sequelize is employed as the Object-Relational Mapping (ORM) tool for managing the database.
  
- **Express-session**: The `express-session` npm package is utilized for user authentication and session management.

## Project Preview

Here's a brief preview of the application:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./02-Challenge/Assets/Screenshot%202023-05-29%20at%2011.08.41%20AM.png)

You can access the live project via this link: [Tech Blog](https://github.com/nhunguyen-debug/MVC-From-Rice-Wren.git)

## Getting Started

To run this project locally or deploy it to your own server, follow these steps:

1. Clone this repository: `git clone https://github.com/nhunguyen-debug/MVC-From-Rice-Wren.git`
2. Install the necessary dependencies: `npm install`
3. Configure your database settings in the `.env` file.
4. Run the application: `npm start`

Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding.

## Contribution

Contributions to this project are welcome. If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Description of changes'`
4. Push your changes to your fork: `git push origin feature-name`
5. Create a Pull Request against the `main` branch of this repository.

Please ensure your code follows best practices and includes appropriate comments and documentation.

## Issues and Support

If you encounter any issues or have questions about the project, please create an issue on this repository. We'll do our best to address them.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
