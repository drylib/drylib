package str

type Map struct {
	data map[string]string
}

type Pair struct {
	Key, Val string
}

func (this *Map) Get(key string) string {
	if this.data == nil {
		return ""
	}
	return this.data[key]
}

func (this *Map) Add(key, val string) {
	if this.data == nil {
		this.data = make(map[string]string)
	}
	this.data[key] = val
}

func (this *Map) Remove(key string) string {
	ret := this.data[key]
	delete(this.data, key)
	return ret
}

func (this *Map) It() []Pair {
	ret := make([]Pair, 0)
	for key, val := range this.data {
		ret = append(ret, Pair{key, val})
	}
	return ret
}
