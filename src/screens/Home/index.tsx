import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    refreshTransactions,
    loading,
    loadMoreTransactions,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();
  const { transactions } = useTransactionContext();

  const handleFetchCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Erro ao buscar categorias");
    }
  };

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Erro ao buscar transações");
    }
  };

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Erro ao carregar mais transações");
    }
  };

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Erro ao Recarregar transações");
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={(item) => `transaction-${item.id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
