# Develop features on Trinity

**As well as an application, Trinity is an open-source platform on which you can develop new features.**

Trinity desktop is written in React and built on Electron, whereas Trinity mobile is written in React Native.

Developers are encouraged to contribute to the [GitHub issues](https://github.com/iotaledger/trinity-wallet/issues).

To get started with Trinity development, do the following:

1. Install the shared dependencies
2. Install the desktop development environment or the mobile development environment
3. Contribute to the code
4. Submit a pull request

## Prerequisites

To develop Trinity, your computer must have the following:
* [Node JS (8+)](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

**Note:** Restart your computer after installing these programs.

## Install the shared dependencies

1. Clone the Trinity repository
    ```bash
    git clone https://github.com/iotaledger/trinity-wallet.git
    ```

2. Change into the `trinity-wallet` directory
    ```bash
    cd trinity-wallet
    ```

3. Install the shared dependencies
    ```bash
    yarn deps:shared
    ```

Now, you can install either the desktop or the mobile development environment.

## Install the desktop development environment

1. Install Electron
    ```bash
    npm install electron -g
    ```

2. 
    * If you're using the Windows operating system, install the Windows build tools to compile the native modules
        ```bash
        npm install --global windows-build-tools
        ```
    * If you're using the Linux operating system, install the following packages to compile the native modules
        ```bash
        sudo apt install build-essential libudev-dev libusb-1.0-0 libusb-1.0-0-dev
        sudo apt install gcc-4.8 g++-4.8 && export CXX=g++-4.8
        # Fedora only:
        yum install libusbx-devel
        ```

3. Install the desktop dependencies
    ```bash
    npm run deps:desktop
    ```

4. Change into the `desktop` directory
    ```bash  
    cd src/desktop
    ```

5. Build Trinity desktop
    ```bash
    npm run build
    ```

6. 
    * If you want an executable file, compile Trinity

        ```bash
        npm run compile:mac
        ```

        **Note:** Change `mac` to your operating system: mac, win, or linux.
    * Or, run Trinity in development mode
        ```bash
        npm start
        ```

## Install the mobile development environment

1. [Install the React Native dependencies](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-2)
    **Note:** If you are targeting iOS and are using Xcode 10+, enable the legacy build system.
2. If you are targeting the iOS operating system, [install CocoaPods](https://cocoapods.org/#install).

3. Install the mobile dependencies
    ```bash
    yarn deps:mobile
    ```

4. Change into the `mobile` directory
    ```bash
    cd src/mobile
    ```

5. 
    * If you are targeting the iOS operating system, do the following:
        1. Install the additional dependencies with CocoaPods
            ```bash
            cd ios && pod install && cd ..
            ```

        2. Run Trinity
            ```bash
            yarn ios:dev
            ```

        3. Run the logger
            ```bash
            yarn log:ios
            ```

    * If you are targeting the Android operating system, do the following:
        1. Run the application
            ```bash
            yarn android:dev
            ```

        2. Run the logger
            ```bash
            yarn log:android
            ```

## Contribute to the code

Create a new Git branch from the `develop` branch
    ```bash
    git checkout -b feature/my-awesome-new-feature
    ```

**Note:** Use a prefix to name your branches (for example, `feature/my-awesome-new-feature` or `bugfix/something-not-working`).

Make all your changes to this branch.

### Create a new theme

A theme consists of a color scheme used by the UI of the mobile and desktop wallets. All themes are located in separate JavaScript files in the `/src/shared/themes/` directory.

1. In the `themes` directory, create a new JavaScript file and copy the contents of the Classic.js file into it

2. Change the color values to suit your theme

3. In the themes.js file, import your theme and add it to the `themes` constant

4. Go to `src/shared/locales/en/translation.json`, and add the name of your theme to the `themes` object. If you miss this step, the name of your theme will not be correct in Trinity.

### Localize new strings

The IOTA community is very large and diverse. Therefore, it's important that users can use Trinity in their native language. The i18next and react-i18next libraries are used to make localization easier.

If you are making a contribution that includes adding or changing text, follow these localization instructions.

1. Import the `translate` higher order component (HOC)
    ```javascript
    import { translate } from ‘react-i18next’;
    ```

2. Create a `t` constant, and set it to the `props` object
    ```javascript
    const { t } = this.props;
    ```

3. Tell i18next to get the translations for your keys (give the key an appropriate name).
    ```javascript
    <Text>{t(‘helloWorld’)}</Text>
    ```

4. Wrap the component
    ```javascript
    export translate(‘myContainer’)(MyContainer);
    ```

5. Add the transaction for your keys to the translation.json file in the `src/shared/locales/en/` directory
    ```json
    "myContainer":{
        "helloWorld": "Hello world!"
    }
    ```

Your strings will be shown on [Crowdin](https://crowdin.com/project/iota-trinity-wallet) when we merge your pull request into the `develop` branch. The community can contribute to Trinity by translating your strings on Crowdin.

## Submit a pull request

After you've made your changes, create a new pull request on GitHub.

Use your branch as the source branch and use the `develop` branch as the target branch.