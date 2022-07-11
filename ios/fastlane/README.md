fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios deployDevFirebase
```
fastlane ios deployDevFirebase
```
Deploy a new dev build to firebase app distribution

This will also make sure the profile is up to date
### ios deployStageFirebase
```
fastlane ios deployStageFirebase
```
Deploy a new stage build to firebase app distribution

This will also make sure the profile is up to date
### ios deployProdFirebase
```
fastlane ios deployProdFirebase
```
Deploy a new prod build to firebase app distribution

This will also make sure the profile is up to date
### ios testFlightStage
```
fastlane ios testFlightStage
```
Deploy a new stage build to apple testFlight
### ios testFlightProd
```
fastlane ios testFlightProd
```
Deploy a new prod build to apple testFlight
### ios appStoreProd
```
fastlane ios appStoreProd
```
Deploy a new prod build to apple appstore

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
