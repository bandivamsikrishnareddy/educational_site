#include <iostream> // Include the necessary header for std::cout and std::endl
using namespace std;

class Complex
{
private:
    double real, imaginary;

public:
    Complex() : real(0), imaginary(0) {} // Default constructor
    Complex(double a, double b) : real(a), imaginary(b) {}

    Complex operator+(const Complex &other)
    {
        Complex result;
        result.imaginary = this->imaginary + other.imaginary;
        result.real = this->real + other.real;
        return result;
    }
    void print()
    {
        cout << this->real << " " << this->imaginary;
    }
};

int main()
{
    Complex a(4.5, 5.5); // Create objects directly instead of using pointers
    Complex b(5.5, 6.6);
    Complex c = a + b;
    c.print();
}
