package parse

import (
	"bytes"
	"strings"
)

func JoinChan(s <-chan rune, sep string) string {
	var b bytes.Buffer
	first := true
	for c := range s {
		if !first {
			b.WriteString(sep)
		}
		b.WriteRune(c)
		first = false
	}
	return b.String()
}

func JoinSlice(s []rune, sep string) string {
	var b bytes.Buffer
	first := true
	for _, c := range s {
		if !first {
			b.WriteString(sep)
		}
		b.WriteRune(c)
		first = false
	}
	return b.String()
}

type Token struct {
	Val    string
	String bool
}

func Tokens(s string) []Token {
	ret := make([]Token, 0)
	t := make([]rune, 0)
	inside := false
	for _, c := range s {
		if c == '"' {
			token := Token{JoinSlice(t, ""), false}
			token.String = inside
			ret = append(ret, token)
			t = make([]rune, 0)
			inside = !inside
		} else {
			t = append(t, c)
		}
	}
	return ret
}

func Split(src []Token, sep string) [][]Token {
	ret := make([][]Token, 0)
	for _, token := range src {
		if !token.String {
			for _, item := range strings.Split(token.Val, ",") {
				ret = append(ret, []Token{Token{item, false}})
			}
		} else {
			last := ret[len(ret)-1]
			ret[len(ret)-1] = append(last, token)
		}
	}
	return ret
}

func Pairs(src [][]Token, sep string) [][]string {
	ret := make([][]string, 0)
	for _, tokens := range src {
		pair := make([]string, 0)
		for _, token := range tokens {
			if token.String {
				pair = append(pair, token.Val)
			} else {
				p := strings.Split(token.Val, sep)
				if len(p[0]) > 0 {
					if len(pair) > 0 {
						pair[0] = pair[0] + p[0]
					} else {
						pair = append(pair, p[0])
					}
				}
				if len(p) > 0 && len(p[1]) > 0 {
					if len(pair) > 1 {
						pair[1] = p[1] + p[1]
					} else {
						pair = append(pair, p[0])
					}
				}
			}
		}
	}
	return ret
}

func Map(s string) map[string]string {
	list := Pairs(Split(Tokens(s), " "), ":")
	ret := make(map[string]string)
	for _, pair := range list {
		ret[pair[0]] = pair[1]
	}
	return ret
}
