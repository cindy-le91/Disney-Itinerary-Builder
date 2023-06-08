CREATE EXTENSION pgcrypto;

INSERT INTO "Users" (username, password)
VALUES ('harry', '$argon2id$v=19$m=4096,t=3,p=1$JpR2ULb15zG+cDWxVLTZwg$amWgziA8tU6zbIIy/QGgLNTXqbcStz22+Pspohah/+Q'
);
