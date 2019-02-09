'use strict';

function getEnvironment(grunt) {
   const TYPES = [ 'prd', 'dev' ],
         env = grunt.option('env');

   return TYPES.indexOf(env) === -1 ? 'dev' : env;
}

module.exports = (grunt) => {
   const ENVIRONMENT = getEnvironment(grunt);

   let config;

   config = {
      entryFile: './src/index.ts',
      js: {
         gruntFile: 'Gruntfile.js',
         webpackConfig: 'webpack.config.js',
         all: [
            'Gruntfile.js',
            './src/**/*.js',
            './tests/**/*.js',
         ],
      },
      ts: {
         src: './src/**/*.ts',
         all: [
            './src/**/*.ts',
            './tests/**/*.ts',
         ],
         configs: {
            standards: 'tsconfig.json',
         },
      },
      commands: {
         tsc: './node_modules/.bin/tsc',

         webpack: './node_modules/.bin/webpack',
      },
   };

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: [ ...config.js.all, ...config.ts.all ],
      },

      exec: {
         options: {
            failOnError: true,
         },
         standards: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.standards} --pretty`,
         },
         esm: {
            cmd: `${config.commands.tsc} -p ${config.ts.configs.esm} --pretty`,
         },
         webpackUMD: {
            cmd: `${config.commands.webpack} ${config.entryFile} ${ENVIRONMENT === 'prd' ? '--env.production' : ''}`,
         },
      },

   });

   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-exec');

   grunt.registerTask('standards', [ 'eslint', 'exec:standards' ]);
   grunt.registerTask('default', [ 'standards' ]);

   grunt.registerTask('build-umd', 'exec:webpackUMD');
   grunt.registerTask('build', [ 'build-umd' ]);

   grunt.registerTask('develop', [ 'clean', 'build', 'watch' ]);

};
