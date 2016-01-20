
#include <stdio.h>
#include <iostream>
#include <string.h>

#include "SequentialList.hpp"

using namespace std;


SequentialList::SequentialList(unsigned int cap){
	size_=0;
	capacity_=cap;
	data_ = new DataType[capacity_];
}

SequentialList::~SequentialList(){}

unsigned int SequentialList::size() const {
	return size_;
}

unsigned int SequentialList::capacity() const {
	return capacity_;
}

bool SequentialList::empty() const {
	return (size_==0);
}

bool SequentialList::full() const {
	return (size_ == capacity_);
}

SequentialList::DataType SequentialList::select(unsigned int pos) const {
	if (pos<size_)
		return data_[pos];
	return -1;
}

unsigned int SequentialList::search(SequentialList::DataType val) const {
	for(int i=0;i<size_;i++)
		if (data_[i]==val)
			return i;
	return size_;
}

void SequentialList::print() const {
	cout<<"[ ";
	for (int i=0;i<size_;i++)
		cout<<data_[i]<<" ";
	cout<<"]\n";
}

bool SequentialList::insert(SequentialList::DataType val, unsigned int pos){
 	if (size_ < capacity_ && pos<=size_){
 		for (int i=size_;i>pos;i--)
 			data_[i]=data_[i-1]; 			
 		data_[pos]=val;
 		size_++;
 		return true;
 	}
}

bool SequentialList::insert_front(SequentialList::DataType val){
	return insert(val,0);
}

bool SequentialList::insert_back(SequentialList::DataType val){
	return insert(val,size_);
}	

bool SequentialList::remove(unsigned int pos){
	if (size_>0){
		for (int i=pos;i<size_-1;i++)
			data_[i]=data_[i+1];	
		size_--;	
		return true;
	}	
	return false;
}

bool SequentialList::remove_front(){
	return remove(0);
}

bool SequentialList::remove_back(){
	return remove(size_-1);
}

bool SequentialList::replace(unsigned int pos,DataType val){
	if (pos<size_)
		data_[pos]=val;
	return true;
}
/*int main(){
	SequentialList* newlist = new SequentialList(10);
	(*newlist).insert_front(99);
	(*newlist).print();
}*/