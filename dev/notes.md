# PROJECT NOTES

Just some notes to be remebered especially when making the final paper.

## Prisma

The Object Relational Mapping Library we are using to interact with the database.

### Prisma Client

Prisma Client creates a connection every time it is imported. Therefore, it is important to import it only once to not overload the database with connections. To do this in Nuxt 3 there are 2 main options, adding it to the event context or creating an instance of it on the server then importing it everywhere else. We use the latter.

### MySQL Text Sizes

We are usinng MEDIUMTEXT to store the string of the svg of signatures. Technically, TEXT's 64KiB should normally be enough but its safer to go over. Additionally, even if MEDIUMTEXT is 16 MiB it will only use up the space it needs.

```
signature       String?     @db.MediumText
```

| Type       | Maximum length                | Equivalent |
| ---------- | ----------------------------- | ---------- |
| TINYTEXT   | 255 (2^8 −1) bytes            | 256 chars  |
| TEXT       | 65,535 (2^16 −1) bytes        | 64 KiB     |
| MEDIUMTEXT | 16,777,215 (2^24 −1) bytes    | 16 MiB     |
| LONGTEXT   | 4,294,967,295 (2^32 −1) bytes | 4 GiB      |

### Prisma Full Text Search - [DOCS](https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search)

Prisma Client supports full-text search for MySQL and PostgreSQL databases. Full-text search is a technique for searching text data efficiently. However, it is only efficient if the data you want to query from is super heavy as each search would be a new request. Instead since our daatabase is relatively small, we can query all of the daata then sort through it on the client side.

### model SchoolYear

For the school yaer table I set the counters for the control numbers instead of getting the length or number of requests there have been. This way it can retreive the control number quicker and therefore less likely to cause a dublicate control number. However, it is still possible for that to happen just now very very unlikely.

### Prisma Backup
