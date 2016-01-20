#include "DoublyLinkedList.hpp"
#include <iostream>
#include <stdlib.h>
#include <stdio.h>

using namespace std;

DoublyLinkedList::DoublyLinkedList(){
	head_=tail_=NULL;
	size_=0;
}

DoublyLinkedList::~DoublyLinkedList(){}

DoublyLinkedList::Node::Node(DataType val){
	value=val;
	prev=next=NULL;
}

DoublyLinkedList::Node* DoublyLinkedList::getNode(unsigned int pos) const {
	
	if (pos>=0){
		Node* visitor = NULL;
		if (pos<=size_/2){
			visitor=head_;
			for (int i=0;i<pos;i++)
				visitor=visitor->next;
		}
		else{
			visitor=tail_;
			for (int i=size_-1;i>pos;i--)
				visitor=visitor->prev;
		}
		return visitor;
	}
	return NULL;
}

unsigned int DoublyLinkedList::size() const {
	return size_;
}

unsigned int DoublyLinkedList::capacity() const {
	return CAPACITY;
}

bool DoublyLinkedList::empty() const {
	return (size_==0);
}

bool DoublyLinkedList::full() const {
	return (size_==CAPACITY);
}

DoublyLinkedList::DataType DoublyLinkedList::select(unsigned int pos) const {
	Node* temp=getNode(pos);
	if (temp)
		return temp->value;
}

unsigned int DoublyLinkedList::search(DoublyLinkedList::DataType val) const{
	Node* visitor=head_;
	int c=0;
	while (visitor){
		if (visitor->value==val)
			return c;
		else{
			visitor=visitor->next;
			c++;
		}
	}
	return size_;
}

void DoublyLinkedList::print() const {
	Node* visitor=head_;
	cout<<"[ ";
		while(visitor){
				cout<<visitor->value<<" ";
				visitor=visitor->next;
		}
	cout<<"]\n";

}



bool DoublyLinkedList::insert(DataType val, unsigned int pos){
	Node* newNode = new Node(val);
	if (pos==0){
		if (head_){
			newNode->next=head_;
			head_->prev=newNode;
			head_=newNode;

		}
		else
			head_=tail_=newNode;
		size_++;
		return true;
	}
	if (pos==size_){ 
		newNode->prev=tail_;
		tail_->next=newNode;
		tail_=newNode;
		size_++;
		return true;
	}
	else if (Node* target = getNode(pos)){
		newNode->prev=target->prev;
		newNode->next=target;
		target->prev->next=newNode;
		target->prev=newNode;
		size_++;
		return true;
	}
	return false;
	
}

bool DoublyLinkedList::insert_front(DataType val){
	return (insert(val,0));
}
bool DoublyLinkedList::insert_back(DataType val){
	return (insert(val,size_));
}

bool DoublyLinkedList::remove(unsigned int pos){
	if (head_){
		if (pos==0){
			if (head_->next){
				head_=head_->next;
				delete(head_->prev);
				head_->prev=NULL;

			}
			else{
				delete(head_);			
				head_=tail_=NULL;
			}
			size_--;
			return true;
		}

		else if (pos==size_-1){
			tail_=tail_->prev;
			delete(tail_->next);
			tail_->next=NULL;
			size_--;
			return true;
		}


		Node* target = getNode(pos);
		if (target){
			target->prev->next = target->next;
			target->next->prev = target->prev;
			delete(target);
			target=NULL;
			size_--;
			return true;
		}

	}		
}

bool DoublyLinkedList::remove_front(){
	return (remove(0));
}

bool DoublyLinkedList::remove_back(){
	return (remove(size_-1));
}

bool DoublyLinkedList::replace(unsigned int pos, DataType val){
	Node* target = getNode(pos);
	if (target){
		target->value=val;
		return true;
	}
}

