package base

import (
	"fmt"
	"io"
	"reflect"

	"github.com/drylib/drylib/go/src/data"
	"github.com/drylib/drylib/go/src/parse"
)

type Tag struct {
	//tag  string
	Attr data.StrMap
}

type ITag interface {
	//Struct() *Tag
	IHtmlWriter
	Name() string
}

//func (this *Tag) Struct() *Tag { return this }

func (this *Tag) Name() string {
	t := reflect.TypeOf(this)
	for t.Kind() == reflect.Ptr {
		t = t.Elem()
		//ret += "*"
	}
	return t.Name()
}

func Name(me interface{}) string {
	t := reflect.TypeOf(me)
	tag, _ := t.FieldByName("tag")
	return parse.Map(fmt.Sprintf("<%s>", tag.Tag))["html"]
}

func (this *Tag) Head(w io.Writer) {
	fmt.Fprintf(w, `<%s`, this.Name())
	for _, kv := range this.Attr.It() {
		fmt.Fprintf(w, ` %s="%s"`, kv.Key, kv.Val)
	}
}
func (this *Tag) Foot(w io.Writer) {
	fmt.Fprintf(w, `</%s>`, this.Name())
}
