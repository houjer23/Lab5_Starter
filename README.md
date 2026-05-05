# Lab 5 - Starter

Jerry Hou

- [Expose – Party Horn](expose.html)
- [Explore – Speech Synthesis](explore.html)

## Check Your Understanding

**1) Would you use a unit test to test the “message” feature of a messaging application? Why or why not?**

No. Sending a message end-to-end usually involves the UI, networking, authentication, and the recipient’s inbox. Those parts do not behave like one small unit with deterministic inputs and outputs, so this is more like an end-to-end test than unit test. Unit test should debug on a small scale and execute quickly.

**2) Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not?**

Yes. Enforcing an 80-character limit uses deterministic logic: given a string, the code should either accept or reject. Unit tests fit well this this case it has deterministic results, can execute quickly, and debugs on a small scale.