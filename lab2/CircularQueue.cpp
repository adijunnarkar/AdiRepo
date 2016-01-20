#include <iostream>
#include <stdlib.h>
#include "CircularQueue.hpp"

using namespace std;


typedef CircularQueue::QueueItem QueueItem;  // for simplicity
const QueueItem CircularQueue::EMPTY_QUEUE = -999;

CircularQueue::CircularQueue()
{
	capacity_ = 16;
	size_ = 0;
	items_ = new QueueItem[capacity_];
	if(!items_)
		exit(EXIT_FAILURE);
	head_ = tail_ = 0;
}

CircularQueue::~CircularQueue()
{
	delete [] items_;

}
bool CircularQueue::empty() const
{   
	return (size_==0);
}

bool CircularQueue::full() const
{ 
	return (size_==capacity_);
}

int CircularQueue::size() const
{ 
	return size_;
}

bool CircularQueue::enqueue(QueueItem value)
{
	if (!full()){
		items_[tail_] = value;
		tail_=(tail_+1)%(capacity_);
		size_++;		
		return true;
	}
}

QueueItem CircularQueue::dequeue()
{
	if (!empty()){
		QueueItem* temp = new QueueItem;
		if(!temp)
			exit(EXIT_FAILURE);
		*temp = items_[head_];
		head_=(head_+1)%(capacity_);
		size_--;
		return *temp;
	}
	return EMPTY_QUEUE;

}

QueueItem CircularQueue::peek() const
{
	if(!empty())
		return items_[head_];
	return EMPTY_QUEUE;
}

void CircularQueue::print() const
{	int i=0;
	cout<<"[	";
	if (!empty()){
		if (head_>=tail_){
			for (i=head_;i<capacity_;i++)
				cout<<items_[i]<<"	";
			for (i=0;i<tail_;i++)
				cout<<items_[i]<<"	";
		}
		else
			for (i=head_;i<tail_;i++)
				cout<<items_[i]<<"	";

	}
	cout<<"]\n";
}


