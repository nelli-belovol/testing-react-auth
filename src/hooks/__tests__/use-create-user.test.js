import { renderHook, act } from '@testing-library/react';

import { useCreateUser } from '../use-create-user';
import { passwordValidationErrors } from '../../constants/validation';

describe('useCreateUser', () => {
  it('should return an object with the correct properties', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current).toHaveProperty('errorMessage');
    expect(result.current).toHaveProperty('onError');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('onSuccess');
    expect(result.current).toHaveProperty('successMessage');

    expect(typeof result.current.errorMessage).toBe('string');
    expect(typeof result.current.onError).toBe('function');
    expect(typeof result.current.onSubmit).toBe('function');
    expect(typeof result.current.onSuccess).toBe('function');
    expect(typeof result.current.successMessage).toBe('string');
  });

  it('shold set the success message', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.successMessage).toBe('');

    act(() => {
      result.current.onSuccess({ name: 'John', password: '123456' });
    });

    expect(result.current.successMessage).toBe(
      'User John created with password 123456',
    );
  });

  it('shold set the error message', () => {
    const { result } = renderHook(useCreateUser);

    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onError(new Error('Invalid password'));
    });

    expect(result.current.errorMessage).toBe('Invalid password');
  });

  it('should throw an error', async () => {
    const { result } = renderHook(useCreateUser);
    //dont use ACT because we dont change the state

    await expect(result.current.onSubmit({ password: '123' })).rejects.toThrow(
      passwordValidationErrors.length,
    );
  });

  it("shouln't throw an error", async () => {
    const { result } = renderHook(useCreateUser);

    await expect(
      result.current.onSubmit({ password: 'Qwer!23!sd' }),
    ).resolves.toBeUndefined(); // or resolves.toBe() - because we dont have a return
  });
});
