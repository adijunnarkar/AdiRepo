#include <iostream>
#include <string>
using namespace std;

#include "Lab3Tests.hpp"

string get_status_str(bool status)
{
    return status ? "Pass" : "Fail";
}

int main()
{
    PriorityQueueTest pqueue_test;
    BinarySearchTreeTest btree_test;

    bool pqueue_test1_passed = pqueue_test.test1();
    bool pqueue_test2_passed = pqueue_test.test2();
    bool pqueue_test3_passed = pqueue_test.test3();

    bool btree_test1_passed = btree_test.test1();
    bool btree_test2_passed = btree_test.test2();
    bool btree_test3_passed = btree_test.test3();
    btree_test.extra1();
    btree_test.extra2();
    btree_test.extra3();

    cout << "\n ORIGINAL TESTS :\n";
    cout << "---Priority Queue Tests---" << endl;
    cout << "Test1: " << get_status_str(pqueue_test1_passed) << endl;
    cout << "Test2: " << get_status_str(pqueue_test2_passed) << endl;
    cout << "Test3: " << get_status_str(pqueue_test3_passed) << endl;
    cout << endl;
    cout << "---Binary Search Tree Tests---" << endl;
    cout << "Test1: " << get_status_str(btree_test1_passed) << endl;
    cout << "Test2: " << get_status_str(btree_test2_passed) << endl;
    cout << "Test3: " << get_status_str(btree_test3_passed) << endl;
   // cout << "extra1: " << get_status_str(btree_extra1_passed) << endl;
    //cout << "extra2: " << get_status_str(btree_extra2_passed) << endl;

   // system("pause");
}
