#ifndef LAB2_TESTS_HPP
#define LAB2_TESTS_HPP
#include <iostream>
#define ASSERT_TRUE(T) if (!(T)) return false;
#define ASSERT_FALSE(T) if ((T)) return false;

#include "DynamicStack.hpp"
#include "CircularQueue.hpp"
using namespace std;

class DynamicStackTest
{
public:
    bool test1()
    {
      unsigned int size = 24;

      DynamicStack default_size_stack;
      ASSERT_TRUE(default_size_stack.empty() == true)
      ASSERT_TRUE(default_size_stack.size() == 0)    

      DynamicStack stack(size);
      ASSERT_TRUE(stack.empty() == true)
      ASSERT_TRUE(stack.size() == 0)    
      return true;
    }

    bool test2()
    {
      DynamicStack stack;
      stack.push(10);
      ASSERT_TRUE(stack.empty() == false)
      ASSERT_TRUE(stack.size() == 1)       
      ASSERT_TRUE(stack.pop() == 10);
      ASSERT_TRUE(stack.empty() == true)
      ASSERT_TRUE(stack.size() == 0)     
      return true;
    }

    bool test3()
    {
      DynamicStack stack(24);
      stack.push(10);
      stack.push(20);
      ASSERT_TRUE(stack.peek() == 20)     
      ASSERT_TRUE(stack.pop() == 20)
      ASSERT_TRUE(stack.pop() == 10)     
      ASSERT_TRUE(stack.pop() == DynamicStack::EMPTY_STACK)
      ASSERT_TRUE(stack.peek() == DynamicStack::EMPTY_STACK)
      return true;
    }




    bool RunClassStackTests()
{

// Test WF-S-1
if (1) //Test default constructor and delete (check for infinite loops and default values)
{
  cout << "Running Test WF-S-1" << endl;
  DynamicStack* test = new DynamicStack;
  ASSERT_TRUE( (*test).empty())
  ASSERT_TRUE( (*test).size() == 0)
  ASSERT_TRUE( (*test).peek() == DynamicStack::EMPTY_STACK)
  ASSERT_TRUE( (*test).pop() == DynamicStack::EMPTY_STACK)
  cout<<"oops"<<endl;
  delete test;
}


// Test WF-S-2
if (1) //Test data constructor of 0
{
  cout << "Running Test WF-S-2" << endl;
  DynamicStack test(0);
  ASSERT_TRUE( test.empty())
  ASSERT_TRUE( test.size() == 0)
  ASSERT_TRUE( test.peek() == DynamicStack::EMPTY_STACK)
  ASSERT_TRUE( test.pop() == DynamicStack::EMPTY_STACK)
}
// Test WF-S-3
if (1) //Test data constructor, Non-0
{
  cout << "Running Test WF-S-3" << endl;
  DynamicStack test(0);
  ASSERT_TRUE( test.empty())
  ASSERT_TRUE( test.size() == 0)
  ASSERT_TRUE( test.peek() == DynamicStack::EMPTY_STACK)
  ASSERT_TRUE( test.pop() == DynamicStack::EMPTY_STACK)
}

// Test WF_S_4
if (1) // Test expansion
{
    cout << "Running Test WF-S-4" << endl;
    DynamicStack test(5);
    for (int i = 0; i < 1000; i++)
          test.push(i);
}

// Test WF_S_5
if (1) // Test peek and pop on list; order; cant reduce past 0
{
    cout << "Running Test WF-S-5" << endl;
    DynamicStack test(5);
    for (int i = 0; i <= 1000; i++)
          test.push(i);
          
    ASSERT_TRUE( test.size() == 1001)
    
    for (int i = 1000; i >= 0; i--)
    {
          ASSERT_TRUE( test.peek() ==   i)
          ASSERT_TRUE( test.pop() == i)
    }
    ASSERT_TRUE( test.size() == 0)
    
    ASSERT_TRUE( test.peek() == DynamicStack::EMPTY_STACK)
    ASSERT_TRUE( test.pop() == DynamicStack::EMPTY_STACK)
}


return true;
}


};

class CircularQueueTest
{
public:
    bool test1()
    {
      CircularQueue queue;
      ASSERT_TRUE(queue.empty() == true)
      ASSERT_TRUE(queue.full() == false)
      ASSERT_TRUE(queue.size() == 0)
      ASSERT_TRUE(queue.size_ == 0)
      ASSERT_TRUE(queue.capacity_ == 16)     
      return true;
    }

    bool test2()
    {
      CircularQueue queue;
      ASSERT_TRUE(queue.enqueue(10) == true)
      ASSERT_TRUE(queue.empty() == false)
      ASSERT_TRUE(queue.full() == false)
      ASSERT_TRUE(queue.size_ == 1)
      ASSERT_TRUE(queue.head_ == 0)
      ASSERT_TRUE((queue.tail_ == 1) || (queue.tail_ == 2))
      ASSERT_TRUE(queue.dequeue() == 10);
      ASSERT_TRUE(queue.empty() == true)
      ASSERT_TRUE(queue.size_ == 0)
      return true;
    }

    bool test3()
    {
      CircularQueue queue;
      ASSERT_TRUE(queue.enqueue(10) == true)
      ASSERT_TRUE(queue.enqueue(20) == true)     
      ASSERT_TRUE(queue.empty() == false)
      ASSERT_TRUE(queue.full() == false)
      ASSERT_TRUE(queue.size_ == 2)
      ASSERT_TRUE(queue.head_ == 0)
      ASSERT_TRUE((queue.tail_ == 2) || ((queue.tail_ == 3)))
      ASSERT_TRUE(queue.peek() == 10);  
      ASSERT_TRUE(queue.dequeue() == 10);
      ASSERT_TRUE(queue.peek() == 20);  
      ASSERT_TRUE(queue.dequeue() == 20);
      ASSERT_TRUE(queue.peek() == CircularQueue::EMPTY_QUEUE);  
      ASSERT_TRUE(queue.dequeue() == CircularQueue::EMPTY_QUEUE);     
      ASSERT_TRUE(queue.empty() == true)
      ASSERT_TRUE(queue.size_ == 0)
      ASSERT_TRUE(queue.head_ == 2)
      ASSERT_TRUE((queue.tail_ == 2) || (queue.tail_ == 3))
      return true;
    }

    bool extraTest4(){
      cout << "Running test WF_Q_1" << endl;
      CircularQueue test;
      ASSERT_TRUE( (test).empty())
      ASSERT_TRUE( (test).size() == 0)
      ASSERT_TRUE( (test).peek() == CircularQueue::EMPTY_QUEUE)
      ASSERT_TRUE( (test).dequeue() == CircularQueue::EMPTY_QUEUE)
      return true;
    }

    bool extraTest5(){
      cout << "Running test WF_Q_2" << endl;
          CircularQueue test;
          ASSERT_TRUE(test.enqueue(10))
          ASSERT_TRUE(test.size() == 1)
          ASSERT_TRUE(test.peek() == 10)
          ASSERT_TRUE(test.peek() == 10)
          ASSERT_TRUE(test.dequeue() == 10)
          ASSERT_TRUE(test.peek() == CircularQueue::EMPTY_QUEUE)
          ASSERT_TRUE(test.dequeue() == CircularQueue::EMPTY_QUEUE)
          ASSERT_TRUE(test.size() == 0)
          return true;
  }

  bool extraTest6(){
    cout << "Running test WF_Q_3" << endl;
    CircularQueue test;
    for (int i = 1; i <= 10; i++)
        ASSERT_TRUE(test.enqueue(i))
        
    for (int i = 1; i <= 10; i++)
    {
        ASSERT_TRUE(test.peek() == i)
        ASSERT_TRUE( test.dequeue() == i)
    }
    return true;

  }

  bool extraTest7(){
    cout << "Running test WF-Q-4" << endl;
    CircularQueue test;
    for (int i = 0; i < 16; i++)
        ASSERT_TRUE(test.enqueue(i))
  
    ASSERT_FALSE( test.enqueue(5))
    ASSERT_FALSE( test.enqueue(5))
    ASSERT_TRUE( test.full())
    ASSERT_TRUE( test.size() == 16)
    ASSERT_TRUE( test.dequeue() == 0)
    ASSERT_TRUE( test.enqueue(16) == true) 
    return true;

  }
  bool extraTest8(){
    cout << "Running test WF-Q-5" << endl;
    CircularQueue test;
    for (int i = 0; i < 16; i++)
        ASSERT_TRUE(test.enqueue(i))
    
    ASSERT_FALSE( test.enqueue(5))
    ASSERT_FALSE( test.enqueue(5))
    ASSERT_TRUE( test.full())
    ASSERT_TRUE( test.size() == 16)
    ASSERT_TRUE( test.dequeue() == 0)
    ASSERT_TRUE( test.enqueue(16) == true)
    
    for (int i = 1; i <= 16; i++)
    {
        ASSERT_TRUE( test.dequeue() == i)
    }
    ASSERT_TRUE( test.dequeue() == CircularQueue::EMPTY_QUEUE)
    ASSERT_TRUE( test.size() == 0)
    return true;
  }


   bool extraTest9(){
    cout << "Running test WF-Q-6" << endl;
          CircularQueue test;
          test.enqueue(0);
          test.enqueue(1);
          ASSERT_TRUE( test.size() == 2)
          
          for (int i = 0; i < 500; i++)
          {
              ASSERT_TRUE( test.enqueue(i % 2))
              ASSERT_TRUE( test.size() == 3)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)
              ASSERT_TRUE( test.peek() == i % 2)
              ASSERT_TRUE( test.size() == 3)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)
              ASSERT_TRUE( test.dequeue() == i % 2)
              ASSERT_TRUE( test.size() == 2)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)

       }
       return true;
    }


    bool extraTest10(){
      cout << "Running test WF-Q-7" << endl;
          CircularQueue test;
          test.enqueue(0);
          test.enqueue(1);
          ASSERT_TRUE( test.size() == 2)
          
          for (int i = 2; i < 500; i++)
          {
              ASSERT_TRUE( test.enqueue(i % 3)) //First time: expect [0, 1, 2]
              ASSERT_TRUE( test.size() == 3)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)
              ASSERT_TRUE( test.peek() == (i + 1) % 3)
              ASSERT_TRUE( test.size() == 3)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)
              ASSERT_TRUE( test.dequeue() == (i + 1) % 3)
              ASSERT_TRUE( test.size() == 2)
              ASSERT_TRUE( test.empty() == false)
              ASSERT_TRUE( test.full() == false)
          }
          return true;
    }

    bool extraTest11(){
      cout << "Running test JW-Q-1" << endl;
                CircularQueue queue;
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.enqueue(20) == true)
                queue.print();
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 10)
                ASSERT_TRUE(queue.dequeue() == 20)
                return true;

    }

    bool extraTest12(){
      cout << "Running test JW-Q-2" << endl;
                CircularQueue queue;
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.enqueue(10) == true)
                ASSERT_TRUE(queue.full() == true)
                ASSERT_TRUE(queue.empty() == false)
                ASSERT_TRUE(queue.enqueue(10) == false)
                return true;

    }
    
    bool extraTest13(){
      cout << "Running test JW-Q-3     COREDUMPS!" << endl;
          CircularQueue queue;
          ASSERT_TRUE(queue.enqueue(10) == true)
          ASSERT_TRUE(queue.enqueue(20) == true)
          ASSERT_TRUE(queue.enqueue(30) == true)
         // queue.~CircularQueue(); // coredump?

          ASSERT_TRUE(queue.size() == 0)
          //ASSERT_TRUE(queue.full() == true)
          //ASSERT_TRUE(queue.peek() == CircularQueue::EMPTY_QUEUE); 
          //ASSERT_TRUE(queue.dequeue() == CircularQueue::EMPTY_QUEUE);
          return true;

    }

};


#endif


/*
SequentialList
Test1: New empty list is valid: FAIL
Test2: insert_front() and insert_back() equivalent for 0-list: FAIL
Test3: remove_front() and remove_back() equivalent for 1-list: FAIL
Test4: inserting too many should fail: FAIL
Test5: select() and search() work properly: FAIL
Test6: insert_front() keeps moving elements forward: FAIL
Test7: inserting at different positions in the list: FAIL
Test8: try to remove too many, then add some: FAIL
Test9: lots of inserts & deletes, all of them valid: FAIL
Test10: lots of inserts & deletes, some of them invalid: FAIL

LinkedList
Test1: New empty list is valid: FAIL
Test2: insert_front() and insert_back() equivalent for 0-list: FAIL
Test3: remove_front() and remove_back() equivalent for 1-list: FAIL
Test4: replace() works properly: FAIL
Test5: select() and search() work properly: FAIL
Test6: insert_front() keeps moving elements forward: FAIL
Test7: inserting at different positions in the list: FAIL
Test8: try to remove too many, then add some: FAIL
Test9: lots of inserts & deletes, all of them valid: FAIL
Test10: lots of inserts & deletes, some of them invalid: FAIL


*/