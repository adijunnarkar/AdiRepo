#include <iostream>
#include <string>
using namespace std;

#include "Lab2Tests.hpp"

string get_status_str(bool status)
{
    return status ? "Pass" : "Fail";
}

int main()
{
    DynamicStackTest stack_test;
    CircularQueueTest queue_test;

    bool stack_test1_passed = stack_test.test1();
    bool stack_test2_passed = stack_test.test2();
    bool stack_test3_passed = stack_test.test3();

    bool queue_test1_passed = queue_test.test1();
    bool queue_test2_passed = queue_test.test2();
    bool queue_test3_passed = queue_test.test3();

    cout << "---Dynamic Stack Tests---" << endl;
    cout << "Test1: " << get_status_str(stack_test1_passed) << endl;
    cout << "Test2: " << get_status_str(stack_test2_passed) << endl;
    cout << "Test3: " << get_status_str(stack_test3_passed) << endl;
    cout << endl;
    cout << "---Circular Queue Tests---" << endl;
    cout << "Test1: " << get_status_str(queue_test1_passed) << endl;
    cout << "Test2: " << get_status_str(queue_test2_passed) << endl;
    cout << "Test3: " << get_status_str(queue_test3_passed) << endl;

//    system("pause");
}
