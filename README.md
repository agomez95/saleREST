# Project Name: saleREST

## Description:
This project is a RESTful API for managing sales data.

## Installation:
1. Clone the repository: `git clone https://github.com/your-username/saleREST.git`
2. Navigate to the project directory: `cd saleREST`
3. Install the required modules: `npm install`
4. Set up Docker for the project: `npm run docker`
    - Install Docker if you haven't already: [Docker Installation Guide](https://docs.docker.com/get-docker/)
5. Set up Files directorys for the project: `npm run dir`
5. Access the project in your preferred API testing tool (e.g., Postman) using `http://localhost:3000`
6. Start the project using the command specified in the `package.json` file: `npm run local`

## Usage:
1. Open your preferred API testing tool (e.g., Postman)
2. Send HTTP requests to the following endpoints: (need more)
    - GET /sales: Retrieve all sales data
    - POST /sales: Create a new sale
    - GET /sales/:id: Retrieve a specific sale by ID
    - PUT /sales/:id: Update a specific sale by ID
    - DELETE /sales/:id: Delete a specific sale by ID

## Contributing:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "Add your commit message"`
4. Push your changes to the branch: `git push origin feature/your-feature-name`
5. Open a pull request on GitHub

## Warning:
This project use a specific package for get type of data from image, there are a certain kind of configuration for differents SO's. You can follow the next instructions for works with this package:

MAC OS:

1. First step is do is install the the "Homebrew", the Homebrew is a software package management system that simplifies the installation of software on Apple's operating system, macOS, as well as Linux. The installation is with this command:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
2. The next step is add the Homebrew to the "PATH" route:
````
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/agomez95/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
````
3. When the Homebrew is install and added to the PATH you can install "vips" package: `brew install vips`
4. The Homebrew its done, the vips its done and the next one its the "nvm" 'cause this sharp package use a specific version of node and which means that we need to use the "18.17.0" version with this command `nvm install 18.17.0` and `nvm use 18.17.0`

And that its all, the installation takes a lot of time and needs some investigation. I hope that information helps everyone to function the photo module for this project.

More information about this package: [Sharp Installation Guide](https://sharp.pixelplumbing.com/install)

## License:
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.