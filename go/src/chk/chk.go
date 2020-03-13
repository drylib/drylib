package main

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"hash"
	"io"
	"log"
	"os"
	str "strings"
)

func main() {
	var hasher hash.Hash = sha256.New()
	var fileName string
	for _, arg := range os.Args[1:] {
		if str.HasPrefix(arg, "-") {
			switch arg[1:] {
			case "sha1":
				hasher = sha1.New()
			case "sha256", "sha2":
				hasher = sha256.New()
			case "sha512":
				hasher = sha512.New()
			case "md5":
				hasher = md5.New()
			default:
				log.Fatal("Unknown method")
			}

		} else {
			fileName = arg
		}
	}

	if len(fileName) == 0 {
		log.Fatal("File is not specified")
	}

	f, err := os.Open(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	if _, err := io.Copy(hasher, f); err != nil {
		log.Fatal(err)
	}

	os.Stdout.WriteString(hex.EncodeToString(hasher.Sum(nil)))
}
