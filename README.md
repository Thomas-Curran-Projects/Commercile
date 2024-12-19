
# **Commercile**

Browser guessing game for movie and game commercials.

## **Description**

Commercile is a locally run website that has users guess what movie or game is being advertised in a commercial that's been edited to remove all names or recognizable images. 
This project uses HTML, CSS, JavaScript, the Open Movie Database API (OMDB), the Internet Game Database API (IGDB), and AWS' Secrets Manager and API Gateway
for a proxy server used for fetching IGBD. Created to replicate the layout and features of other daily browser games. 

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Reasources](#reasources)
- [Known issues & future development](#knownissues&futuredevelopment)
- [License](#license)

## **Installation**

To install Commercile, follow these steps:

1. Clone the repository: **[`git clone https://github.com/username/project-title.git`](https://github.com/Thomas-Curran-Projects/Commercile.git)**
2. Navigate to the project directory: **`cd Commercile`**
3. Install dependencies: **`npm install`**
4. Get an OMDB API key: **[OMDB API key request](https://www.omdbapi.com/apikey.aspx)**
5. Get a client secret & id for IGDB: **[IGDB account creation](https://api-docs.igdb.com/#account-creation)**
6. Follow 'Stack Setup' to create a proxy server for IGDB: **[IGDB proxy server](https://api-docs.igdb.com/#proxy)**
7. In your proxy navigate to Reasourses -> Post -> Integration request -> click edit -> HTTP headers
8. Add the headers Authorization mapped to stageVariables.token, Client-ID mapped to stageVariables.clientid, and Access-Control-Allow-Origin mapped to '*'
9. Create a file called env.js inside the js folder, then add the functions shown in the image:
10. (Optional) Install eslint and prettier extentions for linting/formatting
11. Install an extention that can host html files locally, or install Node.js and run : **`npm install -g serve`**
12. For an extention, follow their directions to host one of the HTML pages
13. For Node.js, navigate to the project directory with **`cd Commercile`** then run **`serve html/file-name`**

## **Usage**

To use Project Title, follow these steps, how to get it running on their machine with images:

1. Open the project in your favorite code editor.
2. Modify the source code to fit your needs.
3. Build the project: **`npm run build`**
4. Start the project: **`npm start`**
5. Use the project as desired.

## **Reasources**

Here are some helpful guides for setting up the project:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes.
4. Write tests to cover your changes.
5. Run the tests to ensure they pass.
6. Commit your changes.
7. Push your changes to your forked repository.
8. Submit a pull request.

## **Known issues & future development**

Project Title is released under the MIT License. See the **[LICENSE](https://www.blackbox.ai/share/LICENSE)** file for details.

## **License**

Project Title is released under the MIT License. See the **[LICENSE](https://www.blackbox.ai/share/LICENSE)** file for details.

## **Authors and Acknowledgment**

Project Title was created by **[Your Name](https://github.com/username)**.

## **Changelog**

- **0.1.0:** Initial release
- **0.1.1:** Fixed a bug in the build process
- **0.2.0:** Added a new feature
- **0.2.1:** Fixed a bug in the new feature
