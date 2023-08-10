// #include<bits/stdc++.h>
// using namespace std;
// int main()
// {
//     double num = 123456789.987654;
//     long nums = int(num);
//     string ans = "";
//     while(nums>0)
//     {
//         int digit = (nums)%10;
//         nums/=10;
//         char c = '0'+digit;
//         ans = c + ans;
//     }
//     ans.push_back('.');
//     double frac = num - int(num);
    
    
//     cout << ans <<endl;
//     return 0;
// }
#include <bits/stdc++.h>
using namespace std;
string func(double num)
{
string frct ="";
double f = num - int(num);
if(f == 0)
{
    return "";
}

while( long(f*1000000) >0)
{
    
    
    f*=10;
    
    int d = int(f);
    frct += (char(d+'0'));
    f = f-double(long(f));
   
    
}
return frct;


}
int main()
{
cout << func(0.9000003);
}