#include "DynamicStack.hpp"
#include <iostream>
#include <string.h>
#include <stdlib.h>

using namespace std;

typedef DynamicStack::StackItem StackItem;  // for simplicity
const StackItem DynamicStack::EMPTY_STACK = -999;

DynamicStack::DynamicStack()
{
	init_size_ = capacity_ = 16;
	size_=0;
	items_ = new StackItem[init_size_];
	if (!items_)
		exit(EXIT_FAILURE);
}

DynamicStack::DynamicStack(unsigned int size)
{
	init_size_ = capacity_= size==0 ? 16 : size;
	size_=0;
	items_ = new StackItem[init_size_];
	if (!items_)
		exit(EXIT_FAILURE);
}

DynamicStack::~DynamicStack()
{
	delete[] items_;
	
}

bool DynamicStack::empty() const
{
	return (size_==0);
}

int DynamicStack::size() const
{
	return size_;
}

void DynamicStack::push(StackItem value)
{	
		
	if (size_==capacity_){
		StackItem* temp = new StackItem;
		if(!temp)
			exit(EXIT_FAILURE);
		temp = items_;
		StackItem* newItems = new StackItem[2*capacity_];
		memcpy(newItems, items_, size_*sizeof(StackItem));
		items_=newItems;
		delete[] temp;
		capacity_*=2;
	}
	items_[size_]=value;
	++size_;
}

StackItem DynamicStack::pop()
{
	if(size_>0){
		StackItem* t = new StackItem;
		*t = items_[size_-1];
		--size_;
		if (size_<=0.25*capacity_ && capacity_/2>=init_size_){
			StackItem* temp =  new StackItem;
			if(!temp)
				exit(EXIT_FAILURE);
			temp = items_;
			StackItem* newItems = new StackItem[capacity_/2];
			memcpy(newItems, items_, sizeof(StackItem)*size_);
			items_ = newItems;
			delete[] temp;
			capacity_/=2;

		}
		return *t;
	}
	return EMPTY_STACK;
}

StackItem DynamicStack::peek() const
{
	if (!empty())
		return items_[size_-1];
	return EMPTY_STACK;
}

void DynamicStack::print() const
{
	cout<<"[	";
	for (int i=size_-1;i>=0;i--)
		cout<<items_[i]<<"	";
	cout<<"]\n";
}



/*int main(){
	DynamicStack* ds = new DynamicStack(19);
	cout<<"initial capacity:	"<<ds->capacity_<<endl;
	for (int i=0;i<=100;i++){
		ds->push(i);
		cout<<"push			";
		cout<<"size:		"<<ds->size_<<"		|	capacity:		"<<ds->capacity_<<"		peek:	"<<ds->peek()<<"\n";
		//ds->print();
	}
	for (int i=0;i<=100;i++){
		ds->pop();
		cout<<"pop	   		";
		cout<<"size:		"<<ds->size_<<"		|	capacity:		"<<ds->capacity_<<"		peek:	"<<ds->peek()<<"\n";
		//ds->print();
	}

	cout<<"\n\nsize:		"<<ds->size_<<"		|	capacity:		"<<ds->capacity_<<"\n";
	ds;
}*/
