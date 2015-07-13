# angular-rxjs
An experiment using [RxJS](http://reactivex.io/) with Angular.

#### Prerequisites

* [Node Package Manager](https://npmjs.org/) (NPM)
* [Git](http://git-scm.com/)

*Note: [installation instructions for NodeJS on Ubuntu](http://stackoverflow.com/questions/16302436/install-nodejs-on-ubuntu-12-10/16303380#16303380)*

#### Dependencies

* [http-server](https://github.com/indexzero/http-server)
* [Gulp](http://gulpjs.com/)

## Environment setup
####1. Install http-server

    $ sudo npm install -g http-server

####2. Install project dependencies
Run the command below in the project root directory.

    $ npm install
    $ bower install

## Build instructions
To run the application server, run `$ http-server app` inside the project's root directory.

## Deploy online demo

    $ gulp deploy
    