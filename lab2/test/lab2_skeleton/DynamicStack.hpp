/*
 * DynamicStack implements a stack using a dynamically resizable array.
 * Default size of the array is 16.
*/

#ifndef DYNAMIC_STACK_HPP
#define DYNAMIC_STACK_HPP

class DynamicStack
{
    friend class DynamicStackTest;
    
public:
    // Can be seen outside as DynamicStack::StackItem
    typedef int StackItem; 
    // Used as an indicator of empty stack.
    static const StackItem EMPTY_STACK;

    // Default constructor used to initialise the dynamic stack array.
    // Default size is 16.
    DynamicStack();
    
    // Constructor used to initialise the dynamic stack array with the argument
    // 'size' identifying the stack size.
    // If size is 0, use an initial size of 16.
    DynamicStack(unsigned int size);
    
    // Destructor. It deallocates the memory space allocated for the stack.
    ~DynamicStack();
    
    // Takes as an argument a StackItem value. If the stack is not full, the value
    // is pushed onto the stack. Otherwise, the size limit of the stack is doubled
    // and the item is pushed onto the resized stack.
    void push(StackItem value);
    
    // Removes and returns the top item from the stack, if it is not empty. If the
    // number of items remaining in the stack after popping is less than or equal
    // to 1/4 of the size limit of the array, then the array is halved unless the 
    // new size would be less than the initial size. If the stack is empty before
    // the pop, the EMPTY_STACK constant is returned.
    StackItem pop();
  
    // Returns true if the stack is empty and false otherwise.
    bool empty() const;
    
    // Returns the number of items in the stack.
    int size() const;
  
    // Same as pop() function except that the top item is returned and is not
    // removed from the stack.
    StackItem peek() const;
    
    // Prints the stack items sequentially ordered from the top to the bottom of 
    // the stack.
    void print() const;
  
private:
    // Override copy constructor and assignment operator in private so we can't
    // use them.
    DynamicStack(const DynamicStack& other) {}
    DynamicStack operator=(const DynamicStack& other) {}

private:
    // (Dynamic) array of stack items.
    StackItem* items_;
    // Maximum number of elements allowed in the stack.
    int capacity_;
    // Current number of elements in the stack.
    int size_;
    // Initial size of the array (i.e. the size in the constructor). This is used
    // in pop() to determine if we should decrease the size.
    int init_size_;
};

#endif
