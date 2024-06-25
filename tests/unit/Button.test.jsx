import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/Button';

describe('Button component', () => {
  it('should render a button with given text', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /Click me/i })
    ).toBeInTheDocument();
  });

  it('should handle onClick event', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /Click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply additional styles', () => {
    render(<Button style={{ backgroundColor: 'blue' }}>Styled Button</Button>);
    const button = screen.getByRole('button', { name: /Styled Button/i });
    expect(button).toHaveStyle('background-color: rgb(0, 0, 255)');
  });

  it('should apply className', () => {
    render(<Button className="custom-class">Class Button</Button>);
    expect(screen.getByRole('button', { name: /Class Button/i })).toHaveClass(
      'custom-class'
    );
  });
});
