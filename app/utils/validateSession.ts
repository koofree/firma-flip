import { clientConfig, SESSION_KEY_VALIDATOR, SESSION_VALIDATOR_ABI } from '@/config';
import type { SessionConfig } from '@abstract-foundation/agw-client/sessions';
import type { Address } from 'viem';
import { createPublicClient, http } from 'viem';
import { abstractTestnet } from 'viem/chains';
import { clearStoredSession } from './clearStoredSession';
import { createAndStoreSession } from './createAndStoreSession';

/**
 * @function validateSession
 * @description Checks if a session is valid by querying the session validator contract
 *
 * This function verifies whether a session is still valid (active) by calling the
 * sessionStatus function on the Abstract Global Wallet session validator contract.
 * If the session is found to be invalid (expired, closed, or non-existent), it
 * automatically cleans up the invalid session data and attempts to create a new session.
 *
 * The validation is performed on-chain by checking the status of the session hash
 * for the given wallet address. The status is mapped to the SessionStatus enum,
 * where Active (1) indicates a valid session.
 *
 * @param {Address} address - The wallet address that owns the session
 * @param {string} sessionHash - The hash of the session to validate
 * @param {(params: { session: SessionConfig }) => Promise<{ transactionHash?: `0x${string}`; session: SessionConfig }>} createSessionAsync - The function to create a new session
 *
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether
 *                            the session is valid (true) or not (false)
 */
export const validateSession = async (
  address: Address,
  sessionHash: string,
  createSessionAsync: (params: {
    session: SessionConfig;
  }) => Promise<{ transactionHash?: `0x${string}`; session: SessionConfig }>
): Promise<boolean> => {
  console.log('Validating session for address:', address);
  const publicClient = createPublicClient({
    chain: clientConfig.chain,
    transport: http(),
  });

  try {
    const status = (await publicClient.readContract({
      address: SESSION_KEY_VALIDATOR as `0x${string}`,
      abi: SESSION_VALIDATOR_ABI,
      functionName: 'sessionStatus',
      args: [address as `0x${string}`, sessionHash],
    })) as SessionStatus;

    // On Abstract testnet, any session is allowed, so we skip the check
    // However, on mainnet, we need to check if the session is both whitelisted and active.
    const isValid =
      status === SessionStatus.Active ||
      (clientConfig.chain.id === abstractTestnet.id && status === SessionStatus.NotInitialized);

    if (!isValid) {
      clearStoredSession(address);
      await createAndStoreSession(address, createSessionAsync);
    }

    return isValid;
  } catch (error) {
    console.error('Failed to validate session:', error);
    return false;
  }
};

/**
 * @enum {number} SessionStatus
 * @description Represents the possible statuses of an Abstract Global Wallet session
 *
 * This enum maps to the SessionKeyPolicyRegistry.Status values.
 * It's used to determine if a session is valid and can be used to submit transactions on behalf of the wallet.
 */
enum SessionStatus {
  /**
   * Session has not been initialized or does not exist
   */
  NotInitialized = 0,

  /**
   * Session is active and can be used to submit transactions
   */
  Active = 1,

  /**
   * Session has been manually closed/revoked by the wallet owner
   */
  Closed = 2,

  /**
   * Session has expired (exceeded its expiresAt timestamp)
   */
  Expired = 3,
}

export default SessionStatus;
