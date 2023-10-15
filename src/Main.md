## POST /cjp

```typescript
type RequestBody = {
  input: string
}

type ResponseBody = {
  output: string
}
```

## POST /genhera

```typescript
type RequestBody = {
  input: string
}

type ResponseBody = {
  output: string
}
```

## POST /nomlish

```typescript
type RequestBody = {
  input: string
  level?: 1 | 2 | 3 | 4
}

type ResponseBody = {
  output: string
}
```

## POST /googleRetranslate

```typescript
type RequestBody = {
  input: string
  target?: string
  source?: string
}

type ResponseBody = {
  output: string
}
```
