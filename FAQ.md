# FAQ

## `error: '__builtin_ia32_pblendw128' needs target feature sse4.1`

The compiler isn't enabling SSE4.1 for some reason. If you add:
```
target_compile_options(
  sodium
  PRIVATE
    -march=native
)
```
here:
https://github.com/sodium-friends/sodium-native/blob/3cb0cf85b021411a9bee02ebec607c4ba5a4fefd/CMakeLists.txt#L353

> That will enable all the processor extensions supported by your CPU. If SSE4.1
is among those then the code should compile.
– Kasper in bare dev (new) room

Subsequent error in react native compile:
```
❌  Undefined symbols for architecture x86_64
┌─ Symbol: _crc_u32
└─ Referenced from: _crc_u32_napi in libhello_bare.a(binding.c.o)
```

can be fixed by upgrading `bare-dev`.
