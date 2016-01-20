#ifndef LAB3_TESTS_HPP
#define LAB3_TESTS_HPP
// hi there
#define ASSERT_TRUE(T) if (!(T)) return false;
#define ASSERT_FALSE(T) if ((T)) return false;

#include "PriorityQueue.hpp"
#include "BinarySearchTree.hpp"

// Libraries needed for BinarySearchTreeTest
#include <sstream>
#include <iostream>
#include <queue>
#include <cstdlib>

using namespace std;

class PriorityQueueTest
{
public:
  bool test1()
  {
    PriorityQueue q(16);
    ASSERT_TRUE( q.empty() );
    ASSERT_TRUE( !q.full() );
    ASSERT_TRUE( q.size() == 0 );
    return true;
  }

  bool test2()
  {
    PriorityQueue q(2);
    ASSERT_TRUE( q.enqueue(10) );
    ASSERT_TRUE( !q.empty() );
    ASSERT_TRUE( !q.full() );
    ASSERT_TRUE( q.size() == 1 );
    ASSERT_TRUE( q.max() == 10 );

    ASSERT_TRUE( q.dequeue() );
    ASSERT_TRUE( q.empty() );
    ASSERT_TRUE( !q.full() );
    ASSERT_TRUE( q.size() == 0 );
    return true;
  }

  bool test3()
  {
    PriorityQueue q(3);
    ASSERT_TRUE( q.enqueue(5) );
    ASSERT_TRUE( q.max() == 5 );
    ASSERT_TRUE( q.enqueue(3) );
    ASSERT_TRUE( q.max() == 5 );
    ASSERT_TRUE( q.enqueue(4) );
    ASSERT_TRUE( q.max() == 5 );
    ASSERT_TRUE( q.full() );

    ASSERT_TRUE( !q.enqueue(7) );
    ASSERT_TRUE( q.max() == 5 );
    ASSERT_TRUE( q.full() );
    return true;
  }
};

class BinarySearchTreeTest
{
private:
  // Traverse the tree in level-order so we can check if it was constructed
  // properly. Output is as follows:
  //   "val1 val2 ... valN"
  // where vali is the value of node i, using level-order traversal.
  std::string level_order(BinarySearchTree::Node* root)
  {
    // If no nodes, return an empty string.
    if (root == NULL) {
      return "";
    }
    
    std::stringstream ss;
    std::queue<BinarySearchTree::Node*> node_queue;
    node_queue.push(root);
    while (!node_queue.empty()) {
      BinarySearchTree::Node* cur_node = node_queue.front();
      node_queue.pop();
      ss << cur_node->val << " ";
      if (cur_node->left != NULL) {
        node_queue.push(cur_node->left);
      }
      if (cur_node->right != NULL) {
        node_queue.push(cur_node->right);
      }
    }
    
    std::string level_order_str = ss.str();
    // There is a trailing space at the end of the string; return everything
    // before this.
    return level_order_str.substr(0, level_order_str.size() - 1);
  }

public:
  bool test1()
  {
    // We expect an empty tree at construction.
    std::string expected_tree_level_order = "";
    
    BinarySearchTree bst;
    ASSERT_TRUE(bst.root_ == NULL);
    ASSERT_TRUE(bst.size_ == 0 && bst.size() == 0);
    
    std::string tree_level_order = level_order(bst.root_);
    // Compare the tree's representation to the expected tree.
    ASSERT_TRUE(tree_level_order.compare(expected_tree_level_order) == 0)
    return true;
  }

  bool test2()
  {
    // We expect a single root node with value "5" after everything.
    std::string expected_tree_level_order = "5";
    
    BinarySearchTree bst;
    ASSERT_TRUE(bst.insert(5));
    ASSERT_TRUE(!bst.remove(4));
    ASSERT_TRUE(bst.exists(5));
    ASSERT_TRUE(bst.max() == bst.min() && bst.max() == 5);
    ASSERT_TRUE(bst.size() == 1);
    
    std::string tree_level_order = level_order(bst.root_);
    // Compare the tree's representation to the expected tree.
    ASSERT_TRUE(tree_level_order.compare(expected_tree_level_order) == 0)
    return true;
  }

  bool test3()
  {
    // We expect a 2-node tree at the end of this function -- root node 10 and
    // a child node with value 6.
    std::string expected_tree_level_order = "10 6";
    
    BinarySearchTree bst;
    ASSERT_TRUE(bst.insert(10));
    ASSERT_TRUE(bst.insert(8));
    ASSERT_TRUE(bst.size() == 2);
    ASSERT_TRUE(bst.insert(6));
    ASSERT_TRUE(bst.size() == 3);

    ASSERT_TRUE(bst.remove(8));
    ASSERT_TRUE(bst.size() == 2);
    
    std::string tree_level_order = level_order(bst.root_);
    // Compare the tree's representation to the expected tree.
    ASSERT_TRUE(tree_level_order.compare(expected_tree_level_order) == 0)
    return true;
  }

   bool extra1(){
    srand(time(NULL));
    BinarySearchTree bst;
    int values[10];
    cout<<"\nRunning random values insertion/deletion test\n";
    cout<<"Inserting: \n";
    for (int i=0;i<10;i++){
      values[i] = rand() % 100;
      cout<<values[i]<<"  ";
      ASSERT_TRUE(bst.insert(values[i]));
    }
    cout<<endl;
    ASSERT_TRUE(bst.size()==10);
    cout<<"Deleting: \n";
    for (int i=0;i<10;i++){
      cout<<values[i]<<"  ";
      ASSERT_TRUE(bst.remove(values[i]));
    }

    ASSERT_TRUE(bst.size()==0);
    ASSERT_TRUE(bst.insert(999));
    ASSERT_TRUE(bst.remove(999));
    ASSERT_FALSE(bst.remove(999));
    cout<<endl<<"[Pass]\n";
    return true;
   }

   bool extra2(){
    cout<<"\n\nRunning root deletion test ...       ";
    BinarySearchTree bst;
    bst.insert(20);
    bst.insert(10);
    bst.insert(30);
    bst.remove(20);
    ASSERT_TRUE(bst.root_->val==10 || bst.root_->val==20);
    bst.remove(10);
    bst.remove(30);
    bst.insert(10);
    bst.insert(20);
    bst.insert(30);
    bst.remove(10);
    ASSERT_TRUE(bst.root_->val==20);
    bst.remove(20);
    bst.remove(30);
    bst.insert(99);
    bst.remove(99);
    ASSERT_TRUE(!bst.root_);
    cout<<"[Pass]\n";    
    return true;
   }

   bool extra3(){
    cout<<"\n\nRunning depth test ...          ";
    BinarySearchTree bst; 
    bst.insert(20);
    ASSERT_TRUE(bst.depth()==0);
    bst.insert(10);
    bst.insert(30);
    ASSERT_TRUE(bst.depth()==1);
    bst.insert(5);
    bst.insert(100);
    ASSERT_TRUE(bst.depth()==2);
    bst.insert(999);
    ASSERT_TRUE(bst.depth()==3);
    cout<<"[Pass]\n";
    return true;

   }


};


#endif
