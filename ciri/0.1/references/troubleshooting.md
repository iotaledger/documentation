# Troubleshooting

## Broadcasting transaction failed

There are a lot of these kind of messages:

```bash
2019-02-13 11:04:46:    broadcaster:WARNING: Broadcasting transaction failed
2019-02-13 11:04:46:      requester:WARNING: Sending request failed
2019-02-13 11:04:46:      requester:WARNING: Sending request failed
```

IOTA uses a non-standard UDP package size. Some switches drop these kind of packages. 
You should change the communication protocol with your neighbors to TCP.
