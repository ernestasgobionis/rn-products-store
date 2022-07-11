# fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew cask install fastlane`

# Available Actions

## Android

### android deployDevFirebase

```
fastlane android deployDevFirebase
```

Deploy a new dev build to firebase app distribution

### android deployStageFirebase

```
fastlane android deployStageFirebase
```

Deploy a new stage build to firebase app distribution

### android deployProdFirebase

```
fastlane android deployProdFirebase
```

Deploy a new prod build to firebase app distribution

### android googlePlayInternalStage

```
fastlane android googlePlayInternalStage
```

Deploy a new stage to google play internal

### android googlePlayInternalProd

```
fastlane android googlePlayInternalProd
```

Deploy a new prod to google play internal

### android googlePlayProd

```
fastlane android googlePlayProd
```

Deploy a new prod to google play production

---

This README.md is auto-generated and will be re-generated every time
[fastlane](https://fastlane.tools) is run. More information about fastlane can be found on
[fastlane.tools](https://fastlane.tools). The documentation of fastlane can be found on
[docs.fastlane.tools](https://docs.fastlane.tools).
