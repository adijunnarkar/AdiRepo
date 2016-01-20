#include <iostream>
#include <stdlib.h>
#include <stdio.h>
// for printing
#include <deque>
#include <stack>

//#include <cstdlib>
#include "BinarySearchTree.hpp"

using namespace std;

typedef BinarySearchTree::DataType DataType;
typedef BinarySearchTree::Node Node;

BinarySearchTree::Node::Node(DataType newval){
	val = newval;
	left = NULL;
	right = NULL;
}

BinarySearchTree::BinarySearchTree(){
	root_=NULL;	
	size_=0;
}

BinarySearchTree::~BinarySearchTree(){
	//delete root_->left;
	//delete root_->right;
	//delete root_;

}

bool BinarySearchTree::insert(DataType val){

	Node* newNode = new Node(val);
	if (!root_)
		root_=newNode;
	else{
		Node* vstr = root_;
		Node* prnt = NULL; // parent node for visitor
		while (vstr){
			prnt = vstr;
			vstr = ((val < vstr->val) ? vstr->left : vstr->right);
		}
		((newNode->val < prnt->val) ? prnt->left : prnt->right) = newNode;
	}
	++size_;
	return true;
}



bool BinarySearchTree::remove(DataType val){

	if (!root_)
		return false;

	Node* vstr = root_;
	Node* prnt = NULL;
	while (vstr->val!=val){
		prnt = vstr;
		vstr = ((val < vstr->val) ? vstr->left : vstr->right);
		if (!vstr)
			return false;
	}
	//cout<<"deleting "<<vstr->val;

	// 0 children

	if (!(vstr->left || vstr->right)){
		//cout<<", 0 children"<<endl;

		if (!prnt){ // deleting root node
			delete root_;
			root_=NULL;
		}

		else if (prnt->left == vstr){
			delete(prnt->left);
			prnt->left = NULL;
		}
		else{
			delete(prnt->right);
			prnt->right = NULL;
		}
		
	}

	// 1 child 

	else if (!(vstr->left && vstr->right)){
		//cout<<", 1 child"<<endl;
		Node* tmp;
		Node* orphan;

		if (!prnt){ // i.e. deleting the root node
			tmp = root_;
			root_=((root_->left) ? root_->left : root_->right);
			delete tmp;
		} 
		else {

		orphan = ((vstr->left) ? vstr->left : vstr->right );
		tmp = ((prnt->left == vstr) ? prnt->left : prnt->right );
		((prnt->left == vstr) ? prnt->left : prnt->right ) = orphan;

		delete tmp;
		}

	}
	// 2 children

	else {
		//cout<<", 2 children"<<endl;
		Node* maxLST = vstr->left;
		Node* tmp = NULL;

		while (maxLST->right && maxLST->right->right)
			maxLST = maxLST->right;

		if (maxLST->right){
			vstr->val = maxLST->right->val;
			tmp = maxLST->right;
			maxLST->right = maxLST->right->left;			
		} 
		else {
			vstr->val = maxLST->val;
			tmp = maxLST;
			vstr->left = maxLST->left;			
		}

		delete tmp;
	}
	--size_;
	return true;
}

bool BinarySearchTree::exists(DataType val) const {
	Node* vstr = root_;
	while (vstr){
		if (vstr->val == val)
			return true;
		vstr = (val > vstr->val) ? vstr->right : vstr->left;
	}
	return false;

}

DataType BinarySearchTree::min() const {
	Node* vstr = root_;
	while (vstr->left)
		vstr = vstr->left;
	return vstr->val;
}

DataType BinarySearchTree::max() const {
	Node* vstr = root_;
	while (vstr->right)
		vstr = vstr->right;
	return vstr->val;
}

unsigned int BinarySearchTree::size() const {
	return size_;
}

int BinarySearchTree::getNodeDepth(Node* n) const {
	if (!n) return -1;
	int depthLeft = getNodeDepth(n->left);
	int depthRight = getNodeDepth(n->right);
	return 1 + ((depthLeft > depthRight) ? depthLeft : depthRight);

}

unsigned int BinarySearchTree::depth() const {
	return getNodeDepth(root_);
}

void BinarySearchTree::print() const{
	

 	if (!root_){
 		cout<<"empty!";
 		return;
 	}
 	/*   breadth-first   */
 	/*
	deque<Node* > q;
 	Node* N  = NULL;
 	q.push_back(root_);
 	while(q.size()){
 		N = q.front();
 		q.pop_front();
 		cout<<N->val<<"	";
 		if (N->left)
 			q.push_back(N->left);
 		if (N->right)
 			q.push_back(N->right);
 	}
 	cout<<"\n";
 	/*

 	/*  depth-first => stack    */
 	
 	stack<Node* > st;
 	st.push(root_);
 	Node* N = NULL;
 	while(st.size()){
 		N=st.top();
 		cout<<N->val<<"	";
 		st.pop();
 		if (N->right)
 			st.push(N->right);
 		if (N->left)
 			st.push(N->left);
 	}
 	cout<<endl;
 	
 }

bool printDFR(Node* N){
	if (N && !(N->left || N->right))
		cout<<N->val<<"\n";
	
	if (N->right)
		printDFR(N->right);
	if (N->left)
		printDFR(N->left);
	
}

 

bool BinarySearchTree::SR(Node* parent){
	if (!parent || !(parent->left))
	    return false;

	Node* child = parent->left;
	parent->left = child->right;
	child->right = parent;
	parent = child;
	cout<<parent->val<<endl;

}



/*int main(){
	BinarySearchTree bst;
	int values[3]={20,10,5};
	for (int i=0; i<3;i++){
		bst.insert(values[i]);
		cout<<"depth of the tree: "<<bst.depth()<<"			\n";
		bst.print();
	}
}*/
	


// Implement the functions here.


