# Trit encoding

Since IOTA uses [trinary](root://iota-basics/0.1/concepts/trinary.md) based computing and our current processors only understand binary, 
we need to encode trinary logic in binary logic. 
The encoding options gives you the freedom to choose which trade-off you want to choose to encode trinary logic in binary.
cIRI has different options for the encoding. 
cIRI takes the option value from 1 to 5. (expect 2) 
The trit encoding is defined for the build phase, therefore you need to recompile to change the encoding.
Some examples:

```bash
bazel build -c opt --define network=mainnet --define trit_encoding=5 --crosstool_top=@iota_toolchains//tools/aarch64--glibc--bleeding-edge-2018.07-1:toolchain --cpu=aarch64 --compiler='gcc' --host_crosstool_top=@bazel_tools//tools/cpp:toolchain //ciri
```
```bash
bazel run -c opt --define network=mainnet --define trit_encoding=5 -- ciri
```

#### 1 : One trit in one byte

With option 1, each trit is stored in one byte. 
This option reduces the processor usage for hashing.
The processor does not need to convert the trits or trytes and just uses the algorithm for every trit.

#### 3 : Three trits in one byte

Option 3 means three trits in one byte. Therefore one tryte in one byte. 
This is useful for debugging purposes and more efficient than option 1.

#### 4 : Four trits in one byte

Option 4 stores four trits in one byte. It is just a bit more storage efficient than option 3.

#### 5 : Five trits in one byte

Option 5 stores five trits in one byte. It is the most storage efficient option. 
On the other hand it needs more calculations for hashing, 
since the trits need to get extracted, before you can use the hashing algorithm