# Commit transaction

Each oracle posts its calculated results in a commit transaction on the Tangle. The **commit transaction** includes:

- unique identifying value, called a salt
- hash of the result data
- hash of the result data concatenated with the salt
- signature to verify the oracle