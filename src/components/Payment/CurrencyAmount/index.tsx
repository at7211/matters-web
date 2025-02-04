import { formatAmount } from '~/common/utils'

import styles from './styles.css'

export interface CurrencyAmountProps {
  currency: string
  amount: number
}

export const CurrencyAmount: React.FC<CurrencyAmountProps> = ({
  currency,
  amount,
}) => (
  <section>
    <span className="currency">{currency}</span>
    <span className="amount">{formatAmount(amount)}</span>

    <style jsx>{styles}</style>
  </section>
)
