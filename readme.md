# Secret Santa Gift Swap

#### Link to the site will be here when its live

Secret Santa Gift Swap is a game that a group of friends play during the festive season to spice up the art of giving presents. The game is played in a lounge room type environment with 4-12 players. Each player contributes 3 wrapped gifts into the collective "pile" that accumulate up to the agreed upon total cost for each person to spend.

Once all the gifts have been placed in the center of the room the game is ready to start. The game is played out over 3 rounds in which rolling a dice introduces different scenario's that play out in a clockwise fashion around the room.

## Getting Started

To get started using the project locally you will need an instance of PostgreSQL running. This can be in Docker or running natively. I would recommend creating a Postgres instance in Docker using the [official image](https://hub.docker.com/_/postgres/).

You can do so by running: `docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

Once you have Postgres running, interact with it via the [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli). You can install it globally with `npm install sequelize-cli -g`.

Once the Sequelize CLI is installed, ensure the `config/config.json` file has the correct details in it to interact with your instance of Postgres.

Once the file is set as intended, you can create the DB you will use locally for this project by running `sequelize db:create` and then `sequelize db:migrate`

After that, run `npm install && npm start` to install dependencies and start the server side component.

To run the front-end Angular application install the angular CLI `npm install -g @angular/cli` navigate into the *client* folder run `npm install` and then `ng serve --open`

## Running the tests

`npm test`

## Contributing

Please read *CONTRIBUTING.md* for the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
