package data

type StrMap struct {
	data map[string]string
}

type StrPair struct {
	Key, Val string
}

func (this StrMap) Add(key, val string) {
	if this.data == nil {
		this.data = make(map[string]string)
	}
	this.data[key] = val
}

func (this StrMap) Remove(key string) string {
	ret := this.data[key]
	delete(this.data, key)
	return ret
}

func (this StrMap) It() []StrPair {
	ret := make([]StrPair, len(this.data))
	for key, val := range this.data {
		ret = append(ret, StrPair{key, val})
	}
	return ret
}
