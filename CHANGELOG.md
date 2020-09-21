# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2020-09-21
### Added
- Add option to mock latency for each query

## [1.1.5] - 2020-09-18
### Changed
- Improve unit test: support for HTTP OPTIONS method
- Improve unit test: if the JSON in body request is not valid JSON, respond with a Bad Request 400 Error.
### Fixed
- Throws a Bad Request 400 Error if the JSON in body request to parse is not valid JSON.

## [1.1.4] - 2020-09-10
### Fixed
- Add support for HTTP OPTIONS method so CORS is happy

## [1.1.3] - 2020-09-08
### Fixed
- Bad import package name in the README documentation

## [1.1.2] - 2020-09-06
### Changed
- Use [From Changelog to NPM](https://gitlab.com/GuilleW/from-changelog-to-npm) to publish on NPM
### Fixed
- watch.yml is missing

## [1.1.1] - 2020-08-07
### Fixed
- Gitlab CI not publishing on npmjs.com

## [1.1.0] - 2020-08-07
### Added
- Use CI for Release and Publish on npmjs.com

## [1.0.1] - 2020-07-23
### Changed
- Improve header of README.md with logo
### Fixed
- Text in logo not vectorized

## [1.0.0] - 2020-07-22
### Added
- Mock REST Server published on [gitlab](https://gitlab.com/GuilleW/mock-rest-server) and [npmjs](https://www.npmjs.com/package/mock-rest-server).
