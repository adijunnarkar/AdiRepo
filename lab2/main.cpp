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
    bool stack_extra_passed = stack_test.RunClassStackTests();

    bool queue_test1_passed = queue_test.test1();
    bool queue_test2_passed = queue_test.test2();
    bool queue_test3_passed = queue_test.test3();
    bool extra_test4_passed = queue_test.extraTest4();
    bool extra_test5_passed = queue_test.extraTest5();
    bool extra_test6_passed = queue_test.extraTest6();
    bool extra_test7_passed = queue_test.extraTest7();
    bool extra_test8_passed = queue_test.extraTest8();
    bool extra_test9_passed = queue_test.extraTest9();
    bool extra_test10_passed = queue_test.extraTest10();
     bool extra_test11_passed = queue_test.extraTest11();
     bool extra_test12_passed = queue_test.extraTest12();
     bool extra_test13_passed = queue_test.extraTest13();

    cout << "---Dynamic Stack Tests---" << endl;
    cout << "Test1: " << get_status_str(stack_test1_passed) << endl;
    cout << "Test2: " << get_status_str(stack_test2_passed) << endl;
    cout << "Test3: " << get_status_str(stack_test3_passed) << endl;
    cout << "extra: " << get_status_str(stack_extra_passed) << endl;


    cout << endl;
    cout << "---Circular Queue Tests---" << endl;
    cout << "Test1: " << get_status_str(queue_test1_passed) << endl;
    cout << "Test2: " << get_status_str(queue_test2_passed) << endl;
    cout << "Test3: " << get_status_str(queue_test3_passed) << endl;
    cout << "extra4: " <<get_status_str(extra_test4_passed)<<endl;
    cout << "extra5: " <<get_status_str(extra_test5_passed)<<endl;
    cout << "extra6: " <<get_status_str(extra_test6_passed)<<endl;

     cout << "extra7: " <<get_status_str(extra_test7_passed)<<endl;
     cout << "extra8: " <<get_status_str(extra_test8_passed)<<endl;
     cout << "extra9: " <<get_status_str(extra_test9_passed)<<endl;
     cout << "extra10: " <<get_status_str(extra_test10_passed)<<endl;
     cout << "extra11: " <<get_status_str(extra_test11_passed)<<endl;
     cout << "extra12: " <<get_status_str(extra_test12_passed)<<endl;
     cout << "extra13: " <<get_status_str(extra_test13_passed)<<endl;

   // system("pause");
}
