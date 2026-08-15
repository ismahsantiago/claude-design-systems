/**
 * Warm Consumer.
 *
 * Theme first, then the shared vocabulary: token declarations must land in the
 * stylesheet before the component rules that consume them, and CSS import
 * order follows module import order.
 */
import './theme.css';

export * from '@ds/shared';
