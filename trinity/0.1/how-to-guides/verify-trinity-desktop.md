# Verify your Trinity Desktop download

**When you download Trinity Desktop, you may want to verify its authenticity to make sure that you downloaded the correct one from the IOTA Foundation GitHub repository.**

To verify the authenticity of Trinity Desktop, you can use the SHA256 hash and code signature. Instructions for both of these steps differ, depending on your operating system.

## Windows operating system

### Verify the SHA256 hash

1. Open a command prompt

2. Create a SHA256 hash of the Trinity Desktop .exe file. Replace the path with the path to your Trinity .exe file.

    ```
    certUtil -hashfile path\to\trinity-desktop-version.exe SHA256
    ```
  
    For example, if the file is in the `C:\Users\yourname\Downloads` directory, do the following:
  
    ```
    certUtil -hashfile C:\Users\yourname\Downloads\trinity-desktop-0.3.2.exe SHA256
    ```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) and make sure that they match

### Verify the code signature

1. Right-click on `trinity-desktop-version.exe`

2. Go to **Digital Signatures** > **Details** > **View Certificate**

3. In the Certification Path tab, make sure that the the following information matches the path:

    * DigiCert
    * DigiCert SHA2 Assured Code Signing CA
    * IOTA Stiftung

4. Make sure that the Certificate status reads "This certificate is OK."

## MacOS operating system

### Verify the SHA256 hash

1. Open Terminal (in `/Applications/Utilities/Terminal`)

2.  Create a SHA256 hash of the Trinity Desktop .dmg file. Replace the path with the path to your Trinity .dmg file.

  ```bash
  shasum -a 256 /path/to/trinity-desktop-version.dmg
  ```

  For example, if the file is in `~/Downloads`, do the following:

  ```bash
  shasum -a 256 ~/Downloads/trinity-desktop-0.3.2.dmg
  ```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) and make sure that they match

### Verify the code signature

#### Prerequisites

To follow these instructions you need [Xcode Command Line Tools](https://www.ics.uci.edu/~pattis/common/handouts/macmingweclipse/allexperimental/macxcodecommandlinetools.html).

1. Open Terminal (in `/Applications/Utilities/Terminal`)

2. Verify the Trinity.app file's signature. Replace the path with the path to your Trinity.app file. This command confirms whether the code binaries are actually signed, the signature is valid, all the sealed components are unaltered, and the signature passes some basic consistency checks.

    ```bash
    codesign -d -vv /path/to/Trinity.app
    ```
    
    For example, if the file is in the `/Applications` directory, do the following:
    
    ```bash
    codesign -d -vv /Applications/Trinity.app
    ```

3. Make sure that the following information matches the output of the command:

    ```bash
    Identifier=org.iota.trinity
    Authority=Developer ID Application: IOTA Stiftung (UG77RJKZHH)
    Authority=Developer ID Certification Authority
    Authority=Apple Root CA
    ```

4. Test the signature against system policies. Replace the path with the path to your Trinity.app file.

    ```bash
    spctl -a -vv path/to/Trinity.app
    ```

    For example, if the file is in the `/Applications` directory, do the following:
    
    ```bash
    spctl -a -vv /Applications/Trinity.app
    ```

5. Make sure that the following information matches the output of the command (assuming Trinity is in the `/Applications` directory):

    * `/Applications/Trinity.app: accepted`
    * `source=Developer ID`
    * `origin=Developer ID Application: IOTA Stiftung (UG77RJKZHH)`
    
    
## Linux operating system

### Verify the SHA256 hash

#### Prerequisites

To follow these instructions you need the `sha256sum` package, which is included with most Linux distributions.

1. Open Terminal

2. Create a SHA256 hash of the Trinity Desktop executable file. Replace the path with the path to your Trinity executable file.

  ```bash
  `sha256sum path/to/trinity-desktop-version.AppImage`
  ```

  For example, if the file is in `~/Downloads`, do the following:

  ```bash
  sha256sum ~/Downloads/trinity-desktop-0.3.2.AppImage
  ```

3. Compare your SHA256 hash with the one in the [release notes](https://github.com/iotaledger/trinity-wallet/releases) and make sure that they match
  
### Verify the code signature

1. Download the .asc and .gpg files in the Assets section of the [release notes](https://github.com/iotaledger/trinity-wallet/releases)

2. Import the Trinity GPG key. Replace the path with the path to your Trinity .gpg file.

    ```bash
    gpg --import path/to/gpgfile
    ```
    
    For example, if the file is in the `~/Downloads` directory, do the following:
    
    ```bash
    gpg --import ~/Downloads/iota.foundation.subkey.trinity.public.gpg
    ```

3. Make sure that the following information matches the output of the command:
  
    ```bash
    gpg: key 46A440CCE5664A64: public key "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"
    ```

4. Verify the signature

    ```bash
    gpg --verify path/to/trinity-desktop-version.AppImage.asc path/to/trinity-desktop-version.AppImage
    ```
    
    For example, if the .asc and .AppImage files are both in `~/Downloads`, do the following:
    
    ```bash
    gpg --verify ~/Downloads/trinity-desktop-0.3.2.AppImage.asc ~/Downloads/trinity-desktop-0.3.2.AppImage
    ```

5. Make sure that the following information matches the output of the command:

    ```bash
    gpg: Good signature from "IOTA Foundation (IOTA Foundation Identity) <contact@iota.org>"
    ```
    
