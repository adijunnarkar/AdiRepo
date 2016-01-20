#include <iostream>
#include "PriorityQueue.hpp"

using namespace std;
// Implement the functions here.

typedef PriorityQueue::DataType DataType;

PriorityQueue::PriorityQueue(unsigned int capacity){
	capacity_ = capacity;
	heap_ = new DataType[capacity_+1];
	size_=0;
}

PriorityQueue::~PriorityQueue(){
	delete [] heap_;
}

bool PriorityQueue::full() const {
	return (size_==capacity_);
}

bool PriorityQueue::empty() const {
	return (size_==0);
}

void PriorityQueue::print() const {
	cout<<"[	";
	for (int i=1;i<=size_;i++)
		cout<<heap_[i]<<"	";
	cout<<"]\n";
	
}

bool PriorityQueue::enqueue(DataType val){
	if (full())
		return false;
	int tmp;
	int elementIndex = size_+1;
	int parentIndex = elementIndex/2;
	heap_[elementIndex] = val;

	while (parentIndex > 0 && heap_[elementIndex] > heap_[parentIndex] ){
			tmp = heap_[parentIndex];
			heap_[parentIndex] = heap_[elementIndex];
			heap_[elementIndex] = tmp;
			elementIndex = parentIndex;
			parentIndex = elementIndex/2;
		}	

	++size_;
	return true;
}

bool PriorityQueue::dequeue(){
	if (empty())
		return false;
	int max  = heap_[1];

	for (int i=0;i<size_;i++)
		heap_[i]=heap_[i+1];
	--size_;
	return true;
}

DataType PriorityQueue::max() const {
	if (!empty())
	    return heap_[1];
}
unsigned int PriorityQueue::size() const {
	return size_;
}



/*int main(){
	PriorityQueue q(16);
	cout<<q.size_<<"	"<<q.capacity_<<endl;
	for (int i=0;i<10;i++){
		q.enqueue(i);
		q.print();
	}
	for (int i=0;i<10;i++){
		q.dequeue();
		q.print();
	}

	
}*/
